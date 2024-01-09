const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./config/db");

connectDB();

app.get("/", (req, res) => {
  res.end("App work fine");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
