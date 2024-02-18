const Revenue = require('../models/revenue');

module.exports.getAllRevenue = async (req, res) => {
    try {
        const allRevenue = await Revenue.find({});
        res.status(200).json(allRevenue);
    } catch (error) {
        res.status(500).json(error);
    }
}
