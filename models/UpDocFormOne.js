const mongoose = require("mongoose");
const UpDocFormOneSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
    },
    agree: {
      type: String,
    },
    requireAcertificate: {
      type: String,
    },
    fromDate: {
      type: String,
    },
    toDate: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    firstFormEmail: {
      type: String,
    },
    firstFormFName: {
      type: String,
    },
    firstFormLName: {
      type: String,
    },
    firstFormMobile: {
      type: String,
    },
    firstFormPost: {
      type: String,
    },
    firstFormState: {
      type: String,
    },
    firstFormStreet: {
      type: String,
    },
    firstFormSuburb: {
      type: String,
    },
    switablityForCirtificate: {
      type: String,
    },
    ifOther: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "pending", "canceled"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpDocFormOne", UpDocFormOneSchema);
