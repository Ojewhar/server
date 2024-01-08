require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { connectDB } = require("../config/db");
const formRoutes = require("../routes/formRoutes");
const authRoutes = require("../routes/authRoutes");
const adminRoutes = require("../routes/adminRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const stripeRoutes = require("../routes/stripeRoutes");
const path = require("path");
// connet db
connectDB();
// store app in express function
const app = express();
app.use(bodyParser.json());

// Serving uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use((req, res, next) => {
  if (req.originalUrl.includes("/stripe/webhook")) {
    bodyParser.text({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.use(async (req, res, next) => {
  if (
    !!req.headers?.access_token &&
    req.headers?.access_token !== "undefined" &&
    req.headers?.access_token !== "null"
  ) {
    // Do general verification later (ban, admin, etc.)
  }
  next();
});

//this for route will need for store front, also for admin dashboard
// app.use("/api/auth/", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fileupload", uploadRoutes);

//if you not use admin dashboard then these two route will not needed.
//
// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//
