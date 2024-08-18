const mongoose = require('mongoose')

const purchaseOrderSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ProjectId is required']
    },
    quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'QuotationId is required']
    },
    purchaseOrderNumber: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
}
)

const PurchaseOrders = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrders