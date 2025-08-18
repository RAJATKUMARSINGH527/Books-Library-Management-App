const express = require('express');
const MyBooksModel = require('../models/myBooksModel');
const authenticate = require('../middleware/auth.middleware');

const mybooksRoutes = express.Router();

// GET /api/mybooks - Fetch user's books (protected)
mybooksRoutes.get('/', authenticate, async (req, res) => {
  try {
    const myBooks = await MyBooksModel.find({ userId: req.user.id }).populate('bookId');
    res.json(myBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/mybooks/:bookId - Add book to user's list (protected)
mybooksRoutes.post('/:bookId', authenticate, async (req, res) => {
  try {
    const exists = await MyBooksModel.findOne({ userId: req.user.id, bookId: req.params.bookId });
    if (exists) {
      return res.status(400).json({ message: 'Book already in My Books' });
    }
    const newMyBook = new MyBooksModel({
      userId: req.user.id,
      bookId: req.params.bookId,
      status: 'Want to Read',
      rating: null,
    });
    await newMyBook.save();
    res.status(201).json(newMyBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /api/mybooks/:bookId/status - Update reading status (protected)
mybooksRoutes.patch('/:bookId/status', authenticate, async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ['Want to Read', 'Currently Reading', 'Read'];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const myBook = await MyBooksModel.findOneAndUpdate(
      { userId: req.user.id, bookId: req.params.bookId },
      { status },
      { new: true }
    );
    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in My Books' });
    }
    res.json(myBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /api/mybooks/:bookId/rating - Update book rating (protected)
mybooksRoutes.patch('/:bookId/rating', authenticate, async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const myBook = await MyBooksModel.findOneAndUpdate(
      { userId: req.user.id, bookId: req.params.bookId },
      { rating },
      { new: true }
    );
    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in My Books' });
    }
    res.json(myBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = mybooksRoutes;
