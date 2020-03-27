//////////////////////////////////////////
/// Product Routes
//////////////////////////////////////////

var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var middleware = require("../middleware");

//INDEX - Show all the products in the database
router.get("/", function(req, res) {
  Product.find({}, function(err, allProducts) {
    if (err) {
      console.log(err);
    } else {
      res.render("products/index", { products: allProducts });
    }
  });
});

//CREATE - create a new product
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username,
    phone: req.user.phone
  };
  var newProduct = {
    name: name,
    image: image,
    description: desc,
    author: author,
    price: price
  };
  Product.create(newProduct, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/products");
    }
  });
});

// NEW - show the form to create a new product
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("products/new");
});

// SHOW - show the details of single product
router.get("/:id", function(req, res) {
  Product.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundProduct) {
      if (err) {
        console.log(err);
      } else {
        res.render("products/show", { product: foundProduct });
      }
    });
});

// Edit Product
router.get("/:id/edit", middleware.checkProductOwernship, function(req, res) {
  Product.findById(req.params.id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.render("products/edit", { product: foundProduct });
    }
  });
});

// Update Product
router.put("/:id", middleware.checkProductOwernship, function(req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body.product, function(
    err,
    updatedProduct
  ) {
    if (err) {
      res.redirect("/products");
    } else {
      res.redirect("/products/" + req.params.id);
    }
  });
});

// Delete Product
router.delete("/:id", middleware.checkProductOwernship, function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/products");
    } else {
      res.redirect("/products");
    }
  });
});

module.exports = router;
