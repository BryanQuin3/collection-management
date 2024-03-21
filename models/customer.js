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
CustomerSchema.methods.setImageUrl = function setImageUrl(fieldname){
    const host = process.env.HOST || "http://localhost";
    const port = process.env.PORT || 8000;
    const baseUrl = host === "http://localhost" ? `${host}:${port}` : host;
    this.image_url = `${baseUrl}/public/${fieldname}`;
}

const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;
