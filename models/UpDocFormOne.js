const mongoose = require("mongoose");
const UpDocFormOneSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
    },
    leave: {
      type: String,
    },
    seeking: {
      type: String,
    },
    leavereason: {
      type: String,
    },
    fromDate: {
      type: String,
    },
    toDate: {
      type: String,
    },
    detailSymptoms: {
      type: String,
    },
    optionalFileFirstForm: {
      type: String,
    },
    attachID: {
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
    firstFormCheckoutOption: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "pending", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpDocFormOne", UpDocFormOneSchema);
