const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { connectDB } = require("../config/db");
const formRoutes = require("../routes/formRoutes");
const authRoutes = require("../routes/authRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const stripeRoutes = require("../routes/stripeRoutes");
const mailRoutes = require("../routes/mailRoutes");
const path = require("path");
// connet db
connectDB();
// store app in express function
const app = express();
// Serving uploaded images statically
app.use(express.static("/uploads"));

dotenv.config();
app.use(express.json());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});
app.get("/api", (req, res) => {
  res.send("App works properly!");
});

app.use("/api/form", formRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fileupload", uploadRoutes);

//if you not use admin dashboard then these two route will not needed.

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//
