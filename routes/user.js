const express = require('express');
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl, isLoggedIn} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login', 
        failureFlash: true} ),
        userController.login);

router.get("/logout",userController.logout);

// User Profile Dashboard
router.get("/profile", isLoggedIn, wrapAsync(userController.showProfile));

// User Wishlist
router.get("/wishlist", isLoggedIn, wrapAsync(userController.showWishlist));

// Toggle Favorite listing
router.post("/listings/:id/favorite", isLoggedIn, wrapAsync(userController.toggleFavorite));

module.exports = router;