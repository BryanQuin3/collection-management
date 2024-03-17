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
        required : false,
    }
},{timestamps:true});

// Define el método setImageUrl en el modelo Customer
CustomerSchema.methods.setImageUrl = function setImageUrl(filename){
    const host = process.env.HOST || "http://localhost";
    const port = process.env.PORT || 8000;
    this.image_url = `${host}:${port}/public/${filename}`;
}

const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;
