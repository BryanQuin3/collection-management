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
// seed();
const whitelist = ['http://localhost:3000', 'https://collectionx.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));
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