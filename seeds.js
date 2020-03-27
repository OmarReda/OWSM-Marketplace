var mongoose = require("mongoose");
var Product = require("./models/product");
var Comment = require("./models/comment");

var data = [
  {
    name: "Laptop Mac",
    image:
      "https://pixabay.com/get/55e3d3404d55b108f5d084609620367d1c3ed9e04e507441712b7fd39344cc_340.jpg",
    description: "blah blah blah"
  },
  {
    name: "Laptop hp",
    image:
      "https://pixabay.com/get/52e5dc424354b108f5d084609620367d1c3ed9e04e507441712b7fd39344cc_340.jpg",
    description: "blah blah blah blah blah blah blah"
  },
  {
    name: "Laptop Dell",
    image:
      "https://pixabay.com/get/57e4dd404355a814f6da8c7dda793f7f1636dfe2564c704c7d2b7fd09049cc51_340.jpg",
    description:
      "askldnalsfjnsad;gjnsgjasnasjgnas;djlgnasdj;gnasd;ga;dgjansdgasjgns;g"
  }
];

function seedDB() {
  //Remove all products
  Product.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed ads");
    //Add a few products
    data.forEach(function(seed) {
      Product.create(seed, function(err, product) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a New Ad");
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
                product.comments.push(comment);
                product.save();
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
