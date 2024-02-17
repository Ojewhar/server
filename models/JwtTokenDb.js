const mongoose = require("mongoose");

const JwtTokenDbSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 5 * 60 * 1000, // Set expiration time to 1 hour from now
      index: { expires: "1d" }, // This index will automatically delete the document after 1 hour
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.JwtTokenDb || mongoose.model("JwtTokenDb", JwtTokenDbSchema);
