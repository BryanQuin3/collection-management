const Customer = require('../models/customer');

module.exports.createCustomer = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newCustomer = await Customer.create({
            name,
            email,
            image_url: req.imagePath
        });
        return res.status(201).json(newCustomer);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await Customer.find({});
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
