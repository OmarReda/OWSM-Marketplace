var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Laptop Mac",
    image:
      "https://pixabay.com/get/52e5dc424354b108f5d084609620367d1c3ed9e04e507441762673dd9e4ccc_340.jpg",
    description: "blah blah blah"
  },
  {
    name: "Laptop hp",
    image:
      "https://pixabay.com/get/57e4d1404f57a514f6da8c7dda793f7f1636dfe2564c704c7d2b7bd69049c751_340.jpg",
    description: "blah blah blah blah blah blah blah"
  },
  {
    name: "Laptop Dell",
    image:
      "https://pixabay.com/get/54e6d44a4f52ad14f6da8c7dda793f7f1636dfe2564c704c7d2b7bd69049c35d_340.jpg",
    description:
      "askldnalsfjnsad;gjnsgjasnasjgnas;djlgnasdj;gnasd;ga;dgjansdgasjgns;g"
  }
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed ads");
    //Add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a Campground");
          //Create a cooment
          Comment.create(
            {
              text: "This product is great",
              author: "Omar"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                console.log("Added a Comment");
                campground.comments.push(comment);
                campground.save();
              }
            }
          );
        }
      });
    });
  });
  //Add a few comments
}

module.exports = seedDB;
