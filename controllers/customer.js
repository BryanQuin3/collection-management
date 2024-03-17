const Customer = require('../models/customer');

module.exports.createCustomer = async (req, res) => {
    try {
        const customerExists = await Customer.findOne({ email : req.body.email });
        if (customerExists) {
            return res.status(400).json({ message: "Customer already exists" });
        }
        let customer = new Customer({...req.body});
        if(req.file){
            const { filename } = req.file;
            // ejecutar el método setImageUrl
            console.log('seteando imagen',filename);
            customer.setImageUrl(filename);
        }
        const newCustomer = await customer.save();
        return res.status(201).json(newCustomer);
    } catch (error) {
        return res.status(500).json({message: "Failed to create customer"});
    }
}

module.exports.getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await Customer.find({});
        console.log(allCustomers)
        return res.status(200).json(allCustomers);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getCustomerById = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        return res.status(200).json(customer);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getCustomerCount = async (req, res) => {
    try {
        const count = await Customer.estimatedDocumentCount();
        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}
