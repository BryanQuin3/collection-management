const InvoiceController = require('../controllers/invoice');

module.exports = (app) => {
    app.get('/invoices', InvoiceController.getAllInvoices);
    app.get('/invoices/latest', InvoiceController.getLatestInvoices);
    app.get('/invoices/count', InvoiceController.getInvoiceCount);
    app.get('/invoices/status', InvoiceController.getInvoiceStatus);
    app.get('/invoices/customers/status', InvoiceController.getInvoiceStatusByCustomer)
    app.get('/invoices/details', InvoiceController.getInvoicesDetails)
    app.get('/invoices/:id', InvoiceController.getInvoiceById);
    app.post('/invoices', InvoiceController.createInvoice);
    app.delete('/invoices/:id', InvoiceController.deleteInvoice);
    app.patch('/invoices/:id', InvoiceController.updateInvoice);
}