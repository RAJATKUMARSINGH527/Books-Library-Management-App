const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },           
  author: { type: String, required: true },          
  coverImage: { type: String, default: "" },   
  availability: { type: Boolean, default: true },       
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // reference to the user who added the book
});

module.exports = mongoose.model("Book", bookSchema);
