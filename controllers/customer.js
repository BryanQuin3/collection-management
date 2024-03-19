const Customer = require('../models/customer');

module.exports.createCustomer = async (req, res) => {
    try {
        const customerExists = await Customer.findOne({ email : req.body.email });
        if (customerExists) {
            return res.status(400).json({ message: "Customer already exists" });
        }
        let customer = new Customer({...req.body});
        if(req.file && req.file.originalname !== 'undefined'){
            const { filename } = req.file;
            // verificar si el archivo es una imagen .png, .jpg, .jpeg .avif o .webp
            const ext = (path.extname(filename)).toLowerCase();
            const filetypes = /png|jpg|jpeg|avif|webp/;
            const mimetype = filetypes.test(req.file.mimetype);
            const extname = filetypes.test(ext);
            if (!mimetype && !extname) {
                console.log('File type not allowed');
                return res.status(400).json({ message: "File type not allowed" });
            }
            // verificar si el archivo es mayor a 2MB
            if (req.file.size >= 1000000) {
                console.log('The image must be less than 1MB');
                return res.status(400).json({ message: "The image must be less than 1MB" });
            }
            customer.setImageUrl(filename);
        }
        else{
            customer.image_url = 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710633600&semt=ais'
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
