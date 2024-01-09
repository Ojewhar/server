const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      default: "patient",
      enum: ["patient"],
    },
    formInfo: [
      {
        formId: { type: String },
        formName: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.models.Person || mongoose.model("Person", PersonSchema);

module.exports = Person;
