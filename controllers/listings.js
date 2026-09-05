const Listing = require("../models/listing");
const geocoder = require("../utils/geocoder");

module.exports.index = async (req, res) => {
    let { search, category, sort } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
        let cleanSearch = search.trim();
        let regex = new RegExp(cleanSearch, "i");
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
            { description: regex }
        ];
    }

    if (category && category.trim() !== "") {
        filter.category = category.trim();
    }

    let sortOption = { _id: -1 };
    if (sort === "price_asc") {
        sortOption = { price: 1 };
    } else if (sort === "price_desc") {
        sortOption = { price: -1 };
    } else if (sort === "newest") {
        sortOption = { createdAt: -1 };
    }

    const allListings = await Listing.find(filter).populate("reviews").sort(sortOption);

    // Calculate average rating and review count for each listing
    allListings.forEach(listing => {
        if (listing.reviews && listing.reviews.length > 0) {
            const total = listing.reviews.reduce((sum, r) => sum + r.rating, 0);
            listing.avgRating = (total / listing.reviews.length).toFixed(1);
            listing.reviewCount = listing.reviews.length;
        } else {
            listing.avgRating = null;
            listing.reviewCount = 0;
        }
    });

    let userFavorites = [];
    if (req.user && req.user.favorites) {
        userFavorites = req.user.favorites.map(id => id.toString());
    }

    res.render("listings/index.ejs", {
        allListings,
        search: search || "",
        category: category || "",
        sort: sort || "",
        userFavorites,
    });
};

module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate:{
            path: "author",
        },
    }).populate("owner");
    if(!listing){
        req.flash("error", "Oops! This Listing does not exist!");
        return res.redirect("/listings");
    }

    let avgRating = null;
    if (listing.reviews && listing.reviews.length > 0) {
        const total = listing.reviews.reduce((sum, r) => sum + r.rating, 0);
        avgRating = (total / listing.reviews.length).toFixed(1);
    }

    let isFavorite = false;
    if (req.user && req.user.favorites) {
        isFavorite = req.user.favorites.some(favId => favId.toString() === listing._id.toString());
    }

    res.render("listings/show.ejs", { listing, avgRating, isFavorite });
};

module.exports.createListing = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    const geoData = await geocoder.geocode(req.body.listing.location);
    console.log("Location entered:", req.body.listing.location);
console.log("GeoData:", geoData);

    if (geoData.length > 0) {
        newListing.geometry = {
            type: "Point",
            coordinates: [geoData[0].longitude, geoData[0].latitude],
        };
    }

    newListing.owner = req.user.id;
    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Oops! This Listing does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_256");
    res.render("listings/edit.ejs",{listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    const geoData = await geocoder.geocode(req.body.listing.location);

    if (geoData.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: [geoData[0].longitude, geoData[0].latitude],
        };
    }

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }
    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedListing =  await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};

