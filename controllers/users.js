const User = require("../models/user");
const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderStay !");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to WanderStay !!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};

module.exports.toggleFavorite = async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(req.user._id);
    let index = user.favorites.indexOf(id);
    let isFavorited = false;
    if (index === -1) {
        user.favorites.push(id);
        isFavorited = true;
        req.flash("success", "Added to wishlist!");
    } else {
        user.favorites.splice(index, 1);
        isFavorited = false;
        req.flash("success", "Removed from wishlist!");
    }
    await user.save();

    if (req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"))) {
        return res.json({ success: true, isFavorited });
    }
    res.redirect(req.get("Referrer") || "/listings");
};

module.exports.showWishlist = async (req, res) => {
    let user = await User.findById(req.user._id).populate({
        path: "favorites",
        populate: { path: "reviews" }
    });
    let favorites = (user.favorites || []).filter(listing => listing !== null);
    favorites.forEach(listing => {
        if (listing.reviews && listing.reviews.length > 0) {
            const total = listing.reviews.reduce((sum, r) => sum + r.rating, 0);
            listing.avgRating = (total / listing.reviews.length).toFixed(1);
            listing.reviewCount = listing.reviews.length;
        } else {
            listing.avgRating = null;
            listing.reviewCount = 0;
        }
    });
    res.render("users/wishlist.ejs", { favorites });
};

module.exports.showProfile = async (req, res) => {
    let user = await User.findById(req.user._id).populate({
        path: "favorites",
        populate: { path: "reviews" }
    });
    let hostedListings = await Listing.find({ owner: req.user._id }).populate("reviews");
    let bookings = await Booking.find({ user: req.user._id }).populate("listing").sort({ createdAt: -1 });

    hostedListings.forEach(listing => {
        if (listing.reviews && listing.reviews.length > 0) {
            const total = listing.reviews.reduce((sum, r) => sum + r.rating, 0);
            listing.avgRating = (total / listing.reviews.length).toFixed(1);
            listing.reviewCount = listing.reviews.length;
        } else {
            listing.avgRating = null;
            listing.reviewCount = 0;
        }
    });

    let favorites = (user.favorites || []).filter(listing => listing !== null);
    favorites.forEach(listing => {
        if (listing.reviews && listing.reviews.length > 0) {
            const total = listing.reviews.reduce((sum, r) => sum + r.rating, 0);
            listing.avgRating = (total / listing.reviews.length).toFixed(1);
            listing.reviewCount = listing.reviews.length;
        } else {
            listing.avgRating = null;
            listing.reviewCount = 0;
        }
    });

    res.render("users/profile.ejs", {
        user,
        hostedListings,
        bookings,
        favorites
    });
};