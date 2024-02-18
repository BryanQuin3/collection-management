const RevenueController = require('../controllers/revenue');

module.exports = (app) => {
    app.get('/revenue', RevenueController.getAllRevenue);
}