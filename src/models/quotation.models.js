const mongoose =  require('mongoose')

const quotationSchema = mongoose.Schema({
    quotationNumber: {
        type: String,
        required: [true," Quotation number is required" ]
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true]
    },
    projectName: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    submittedTo: {
        type: String,
        required: true
    },
    sowNumber: {
        type: String,
        required: true
    },
    divisionOfWork: {
        type: String,
        required: true
    },
    revisionNumber: {
        type: String,
        required: true
    },
    dateOfQuotation: {
        type: Date
    },
    inputDocReceived : [{name: String}],
    activities: [{
        name : String,
        workingHrs: Number,
        ratePerHrs: Number,
        isDiscountApplied: Boolean,
        discountPercentage: Number
    }]

},
{
    timestamps: true,
  }
)

const Quotation = mongoose.model('Quotation', quotationSchema)
module.exports = Quotation;