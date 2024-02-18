const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Customer is required"]
    },
    amount : {
        type: Number,
        required: [true, "Amount is required"]
    },
    status : {
        type: String,
        enum: ["paid","pending"],
        required: [true, "Status is required"]
    },
    date : {
        type: String,
        required: [true, "Invoice date is required"]
    },
},{timestamps:true});

const Invoice = mongoose.model("Invoice",InvoiceSchema);
module.exports = Invoice;