const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");

const PORT = process.env.PORT || 5000;
const DBURL = process.env.DBURL;

// middleware
app.use(express.json());
app.use(cors());
app.use(router);

// connect mongoose into mongoDB
mongoose
  .connect(
    "mongodb+srv://Mirzaban:mirzaban@cluster0.fqka3cx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => console.log("successfullt connect mongoose into mongoDB"))
  .catch((err) => console.log(`Connecting error: ${err}`));

// server running
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}/api`)
);
