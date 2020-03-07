//////////////////////////////////////////
/// Variables & Config
//////////////////////////////////////////

var methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  request = require("request"),
  app = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//////////////////////////////////////////
/// DB Schema Setup & Model
//////////////////////////////////////////

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  created: { type: Date, default: Date.now }
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
      res.render("index", { campgrounds: allCampgrounds });
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
  res.render("new");
});

// SHOW - show the details of single campground
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

// EDIT - edit already exsisting item
//app.get();

//UPDATE - update already exsisting item
//app.put();

// DELETE - delete already exsisting item

//////////////////////////////////////////
/// Server
//////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
