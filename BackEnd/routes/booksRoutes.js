const express = require('express');
const bookRoutes = express.Router();
const BookModel = require('../models/bookModel');
const authenticate = require('../middleware/auth.middleware');

// GET /api/books - Get all books (public)
bookRoutes.get('/', async (req, res) => {
  console.log("[GET] Fetching all books");
  try {
    const books = await BookModel.find().populate('addedBy', 'email');
    console.log("[GET] Books found:", books.length);
    res.json({
      message: `${books.length} books retrieved successfully`,
      data: books,
    });
  } catch (err) {
    console.error("[GET] Server Error:", err.message);
    res.status(500).json({ message: 'Failed to fetch books', error: err.message });
  }
});

// GET /api/books/:id - Get single book by ID (public)
bookRoutes.get('/:id', async (req, res) => {
  console.log(`[GET] Fetching book with ID: ${req.params.id}`);
  try {
    const book = await BookModel.findById(req.params.id).populate('addedBy', 'email');
    if (!book) {
      console.warn("[GET] Book not found:", req.params.id);
      return res.status(404).json({ message: 'Oops! The requested book was not found.' });
    }
    res.json({
      message: 'Book details retrieved successfully',
      data: book,
    });
  } catch (err) {
    console.error("[GET] Server Error:", err.message);
    res.status(500).json({ message: 'Failed to fetch book details', error: err.message });
  }
});

// POST /api/books - Add a new book (admin only, authenticated)
bookRoutes.post('/', authenticate, async (req, res) => {
  const { title, author, coverImage, availability } = req.body;
  console.log("[POST] Adding book:", { title, author, coverImage, availability, addedBy: req.user.id });

  try {
    const newBook = new BookModel({
      title,
      author,
      coverImage: coverImage || "",
      availability: availability !== undefined ? availability : true,
      addedBy: req.user.id // automatically set from authenticated user
    });
    await newBook.save();
    console.log("[POST] Book added:", newBook._id);
    res.status(201).json({
      message: `Book '${newBook.title}' added to library successfully!`,
      data: newBook,
    });
  } catch (err) {
    console.error("[POST] Server Error:", err.message);
    res.status(500).json({ message: 'Failed to add new book', error: err.message });
  }
});

// PUT /api/books/:id - Update a book (admin only, authenticated)
bookRoutes.put('/:id', authenticate, async (req, res) => {
  const { title, author, coverImage, availability } = req.body;
  console.log(`[PUT] Updating book ID: ${req.params.id}`, { title, author, coverImage, availability });

  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        coverImage: coverImage || "",
        availability: availability !== undefined ? availability : true,
      },
      { new: true }
    );
    if (!updatedBook) {
      console.warn("[PUT] Book not found:", req.params.id);
      return res.status(404).json({ message: 'Sorry, we couldn’t find the book to update.' });
    }
    console.log("[PUT] Book updated:", updatedBook._id);
    res.json({
      message: `Book '${updatedBook.title}' updated successfully!`,
      data: updatedBook,
    });
  } catch (err) {
    console.error("[PUT] Server Error:", err.message);
    res.status(500).json({ message: 'Failed to update book', error: err.message });
  }
});

// DELETE /api/books/:id - Delete a book (admin only, authenticated)
bookRoutes.delete('/:id', authenticate, async (req, res) => {
  console.log(`[DELETE] Deleting book ID: ${req.params.id}`);

  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      console.warn("[DELETE] Book not found:", req.params.id);
      return res.status(404).json({ message: 'Book not found. Nothing to delete!' });
    }
    console.log("[DELETE] Book deleted:", req.params.id);
    res.json({
      message: `Success! Book '${deletedBook.title}' has been deleted permanently.`,
    });
  } catch (err) {
    console.error("[DELETE] Server Error:", err.message);
    res.status(500).json({ message: 'Failed to delete book', error: err.message });
  }
});

module.exports = bookRoutes;
