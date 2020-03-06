var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var app = express();

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/campgrounds");

var campSchema = new mongoose.Schema({
  name: String,
  image: String
});

var camp = mongoose.model("Camp", campSchema);

var campgrounds = [
  {
    name: "Salmon Greek",
    image:
      "https://negromanosphere.com/wp-content/uploads/2018/02/camping-2581242_960_720-678x381.jpg"
  },
  {
    name: "Country Hills",
    image:
      "http://www.robertgaudette.com/wp-content/uploads/2019/06/going-camping-2.jpg"
  },
  {
    name: "Mountain Ghost Rest",
    image:
      "https://negromanosphere.com/wp-content/uploads/2018/02/camping-2581242_960_720-678x381.jpg"
  },
  {
    name: "Salmon Greek",
    image:
      "https://negromanosphere.com/wp-content/uploads/2018/02/camping-2581242_960_720-678x381.jpg"
  },
  {
    name: "Country Hills",
    image:
      "http://www.robertgaudette.com/wp-content/uploads/2019/06/going-camping-2.jpg"
  },
  {
    name: "Mountain Ghost Rest",
    image:
      "https://negromanosphere.com/wp-content/uploads/2018/02/camping-2581242_960_720-678x381.jpg"
  },
  {
    name: "Salmon Greek",
    image:
      "https://negromanosphere.com/wp-content/uploads/2018/02/camping-2581242_960_720-678x381.jpg"
  }
];

//////////////////////////////////////////////
/// Routes
//////////////////////////////////////////////

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

///////////////////////////////////////////////
/// Server
///////////////////////////////////////////////

app.listen(3000, function() {
  console.log("Assignment Server 3000");
});
