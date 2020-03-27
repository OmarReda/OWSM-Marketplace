//////////////////////////////////////////
/// Index and Auth Routes
//////////////////////////////////////////

var express = require("express");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");

// SHOW - show the landing page
router.get("/", function(req, res) {
  res.render("landing");
});

// Show Register Form
router.get("/register", function(req, res) {
  res.render("register");
});

// Sign Up Logic
router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    phone: req.body.phone
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to OWSM Marketplace " + user.username);
      res.redirect("/products");
    });
  });
});

// Show Login Form
router.get("/login", function(req, res) {
  res.render("login");
});

// Login Logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login",
    failureFlash: "Invalid username or password."
  }),
  function(req, res) {}
);

// Logout
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged You Out");
  res.redirect("/products");
});

module.exports = router;
