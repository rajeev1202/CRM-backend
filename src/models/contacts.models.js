const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phoneNumber: {
      type: [String],
    },
    email: {
      type: [String],
    },
    employedWith: {
      type: String,
    },
    positionInOrg: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model('Contacts',contactsSchema);
module.exports = Contacts;
