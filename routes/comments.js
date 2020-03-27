//////////////////////////////////////////
/// Commnets Routes
//////////////////////////////////////////

var express = require("express");
var Product = require("../models/product");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var router = express.Router({ mergeParams: true });

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { product: product });
    }
  });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/products");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          product.comments.push(comment);
          product.save();
          req.flash("success", "Successfully added your review");
          res.redirect("/products/" + product._id);
        }
      });
    }
  });
});

// Edit Comment
router.get("/:comment_id/edit", middleware.checkCommentOwernship, function(
  req,
  res
) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/edit", {
        product_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// Update Comment
router.put("/:comment_id", middleware.checkCommentOwernship, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/products/" + req.params.id);
    }
  });
});

// Delete Comment
router.delete("/:comment_id", middleware.checkCommentOwernship, function(
  req,
  res
) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("Success", "Review deleted");
      res.redirect("/products/" + req.params.id);
    }
  });
});

module.exports = router;
