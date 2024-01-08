require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONOG_LIVE_URL, {}).then(() => {
      console.log("mongodb connection success!");
    });
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = {
  connectDB,
};
