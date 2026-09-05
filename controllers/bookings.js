const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.createBooking = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let { checkIn, checkOut, guests } = req.body.booking;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
        req.flash("error", "Check-in date cannot be in the past!");
        return res.redirect(`/listings/${id}`);
    }

    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
        req.flash("error", "Check-out date must be after check-in date!");
        return res.redirect(`/listings/${id}`);
    }

    const basePrice = listing.price * nights;
    const tax = Math.round(basePrice * 0.18);
    const totalPrice = basePrice + tax;

    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn: start,
        checkOut: end,
        guests: Number(guests) || 1,
        totalPrice,
        status: "confirmed"
    });

    await newBooking.save();
    req.flash("success", `Booking confirmed for ${nights} night${nights > 1 ? 's' : ''}! Have a great stay!`);
    res.redirect("/bookings");
};

module.exports.index = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ createdAt: -1 });
    res.render("bookings/index.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
    let { bookingId } = req.params;
    let booking = await Booking.findById(bookingId);
    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings");
    }
    if (!booking.user.equals(req.user._id)) {
        req.flash("error", "You do not have permission to cancel this booking!");
        return res.redirect("/bookings");
    }
    booking.status = "cancelled";
    await booking.save();
    req.flash("success", "Booking has been cancelled.");
    res.redirect("/bookings");
};
