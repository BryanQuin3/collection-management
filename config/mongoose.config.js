const mongoose = require('mongoose');
const DB_NAME = "customer-invoices";
const DB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1/${DB_NAME}`;

const mongooseConfig = ()=> {
    console.log("DB_URI: " + DB_URI);
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("CONNECTED TO DB"))
    .catch(err => console.log("ERROR WITH DB: " + err))
}

module.exports = mongooseConfig;