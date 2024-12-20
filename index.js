import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./model/bookModel.js";
import bookRoutes from './routes/booksRoutes.js'
import cors from 'cors';

const app = express();
app.use(express.json());

// 1. All origin with Default of cors(*)
app.use(cors());

// 2. All custom origin
// app.use
// (
//   cors
//   (
//     {
//       origin:'',
//       methods:['GET', 'POST', 'PUT', 'DELETE'],
//       allowedHeaders:['Content-Type'],
//     }
//   )
// )

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome to me");
});

app.use('/books',bookRoutes);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
