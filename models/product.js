//////////////////////////////////////////
/// DB Schema Setup & Model
//////////////////////////////////////////
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    phone: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
