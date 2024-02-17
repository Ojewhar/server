const mongoose = require("mongoose");
const UpDocFormOne = require("./UpDocFormOne");

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
    address: {
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
UserSchema.pre("remove", async function (next) {
  try {
    await UpDocFormOne.deleteMany({ _id: { $in: this.forms } });
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
