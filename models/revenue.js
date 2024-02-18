const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
    month : {
        type: String,
        required: [true, "Month is required"]
    },
    revenue: {
        type: Number,
        required: [true, "Revenue is required"]
    }
},{timestamps:true});

const Revenue = mongoose.model("Revenue",RevenueSchema);
module.exports = Revenue;