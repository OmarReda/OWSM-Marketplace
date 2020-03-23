//////////////////////////////////////////
/// Campground Routes
//////////////////////////////////////////

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - Show all the campgrounds in the database
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - create a new campground
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
  Campground.create(newCampground, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show the form to create a new campground
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// SHOW - show the details of single campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// Edit Campground
router.get("/:id/edit", checkCampgroundOwernship, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

// Update Campground
router.put("/:id", checkCampgroundOwernship, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Delete Campground
router.delete("/:id", checkCampgroundOwernship, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// Login Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Check Ownership
function checkCampgroundOwernship(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
