const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required"]
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        validate : {
            validator : val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message : "Please enter a valid email"
        }
    },
    image_url :{
        type : String,
        required : [true,"Image is required"],
    }
},{timestamps:true});


const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;