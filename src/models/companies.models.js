const mongoose = require("mongoose");

const companiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "company name is required"]
    },
    contactPerson: {
        type: String,
    },
    email: {
        type: String
    },
    currency: {
        type: String
    },
    location: {
        type: String
    }
},
{
    timestamps: true
}

);


const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
