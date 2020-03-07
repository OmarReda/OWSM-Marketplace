//////////////////////////////////////////
/// Variables
//////////////////////////////////////////

var express = require("express"),
  bodyParser = require("body-parser"),
  request = require("request"),
  mongoose = require("mongoose"),
  app = express();

// app.use(express.static("public"));
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////////////////
/// Schema Setup & Model
//////////////////////////////////////////

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Grantie Hill",
//     image:
//       "https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7ed29344c659_340.jpg",
//     description: "This is one of the best campgrounds ever."
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
//   }
// );

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

//////////////////////////////////////////
/// Server
//////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
