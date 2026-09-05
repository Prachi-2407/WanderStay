const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateBooking } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

// View user's bookings
router.get("/", isLoggedIn, wrapAsync(bookingController.index));

// Create a new booking for a listing
router.post("/listing/:id", isLoggedIn, validateBooking, wrapAsync(bookingController.createBooking));

// Cancel a booking
router.post("/:bookingId/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
