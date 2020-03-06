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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//////////////////////////////////////////
/// Routes
//////////////////////////////////////////

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  Campground.create(newCampground, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//////////////////////////////////////////
/// Server
//////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
