const mongoose = require('mongoose');

require('dotenv').config({ path: './config.env' });
const db_uri = process.env.ATLAS_URI;

const connectDb = async() => {
    try {
        await mongoose.connect(db_uri, {useNewUrlParser: true});
        console.log('Connected to MongoDB.')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDb;
