require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");

const path = require("path");
// connet db
connectDB();
// store app in express function
const app = express();
app.use(express.json());
// Serving uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
// app.use("/api/auth/", authRoutes);
app.get("/api", () => {
  try {
    res.status(200).json("Api route work perfect");
  } catch (error) {
    console.log(error);
  }
});

//if you not use admin dashboard then these two route will not needed.
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//
