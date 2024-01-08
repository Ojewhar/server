const mongoose = require("mongoose");
const UpDocFormConsultationSchema = new mongoose.Schema(
  {
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
      require: true,
      unique: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UpDocFormConsultation",
  UpDocFormConsultationSchema
);
