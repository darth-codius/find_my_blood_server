// Importing necessary modules, routes and functions.
const express = require('express');
const bodyParser = require('body-parser');
const bloodRoute = require('./routes/bloodRoute');
const hospitalRoute = require('./routes/hospitalRoute');
const requestRoute = require('./routes/requestRoute');
const mongodb = require('./utils/db.js');


// Declaring necessary variables.
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static("images"));


// starting the database connection here wish was imported
mongodb();

app.use('/hospital', hospitalRoute);
app.use('/hospital/blood', bloodRoute);
app.use('', requestRoute)
app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>");
});
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});