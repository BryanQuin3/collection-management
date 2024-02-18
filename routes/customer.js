const CustomerController = require('../controllers/customer');

module.exports = (app) => {
    app.post('/customers', CustomerController.createCustomer);
    app.get('/customers', CustomerController.getAllCustomers);
    app.get('/customers/count', CustomerController.getCustomerCount);
    app.get('/customers/:id', CustomerController.getCustomerById);
}