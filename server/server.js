const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());
app.use(require('./routes/tacquerias'));

connectDb();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
