const mongoose = require("mongoose");

const companiesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "company name is required"],
    },
    contactPerson: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: [String],
    },
    currency: {
      type: String,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: [String],
    },
    taxation: {
      type: String,
    },
    state: {
      type: String,
    },
    area: {
      type: String,
    },
    pinCode: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const Companies = mongoose.model("Companies", companiesSchema);

module.exports = Companies;
