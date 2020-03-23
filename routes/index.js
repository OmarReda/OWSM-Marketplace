//////////////////////////////////////////
/// Index and Auth Routes
//////////////////////////////////////////

var express = require("express");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");

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
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
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
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// Logout
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

// Login Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
