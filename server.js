const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
//cookieParser
const cookieParser = require('cookie-parser');
const configMongoose = require('./config/mongoose.config');
const customerRoutes = require('./routes/customer');
const invoiceRoutes = require('./routes/invoice');
const revenueRoutes = require('./routes/revenue');
const userRoutes = require('./routes/user');
const seed = require('./seed/seed');

const PORT = process.env.PORT ?? 8000 ;

configMongoose();
seed();
app.use(cors('*'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

customerRoutes(app);
invoiceRoutes(app);
revenueRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});