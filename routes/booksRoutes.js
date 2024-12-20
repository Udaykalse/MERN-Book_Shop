import express from 'express';
import { Book } from '../model/bookModel.js';
const router = express.Router();



// Route
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please fill all the fields : title,author,publicYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// All records

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// get One record

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update One record
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Please fill all the fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.error("Error updating the book:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Delete One record

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).json({
      message: "Book deleted successfully",
      deletedBook,
    });
  } catch (error) {
    console.error("Error deleting the book:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});


export default router;