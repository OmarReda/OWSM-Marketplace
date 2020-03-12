//////////////////////////////////////////
/// Variables & Config
//////////////////////////////////////////

var methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  request = require("request"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds"),
  app = express();

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//////////////////////////////////////////
/// Routes
//////////////////////////////////////////

// SHOW - show the landing page
app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX - Show all the campgrounds in the database
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - create a new campground
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  Campground.create(newCampground, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show the form to create a new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// SHOW - show the details of single campground
app.get("/campgrounds/:id", function(req, res) {
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

// EDIT - edit already exsisting item
//app.get();

//UPDATE - update already exsisting item
//app.put();

// DELETE - delete already exsisting item

//////////////////////////////////////////
/// Commnets Routes
//////////////////////////////////////////

app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});
//////////////////////////////////////////
/// Server
//////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
