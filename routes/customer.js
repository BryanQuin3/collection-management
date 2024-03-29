const CustomerController = require('../controllers/customer');
const { upload, resizeImage,saveResizedImage } = require('../middlewares/storage');

module.exports = (app) => {
    app.post('/customers',upload.single('image_url'),resizeImage,saveResizedImage ,CustomerController.createCustomer);
    app.get('/customers', CustomerController.getAllCustomers);
    app.get('/customers/count', CustomerController.getCustomerCount);
    app.get('/customers/:id', CustomerController.getCustomerById);
}