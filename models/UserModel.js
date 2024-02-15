const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
    },
    forms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "UpDocFormOne",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
