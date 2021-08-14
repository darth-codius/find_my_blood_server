// Importing necessary modules, routes and functions.
const express = require('express');
const bloodRoutes = require('./routes/bloodRoute');
const hospitalRoute = require('./routes/hospitalRoute');
const mongodb = require('./utils/db.js');

// Declaring necessary variables.
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

// starting the database connection here wish was imported
mongodb();

app.use('/hospital', hospitalRoute)
app.get('/', (req, res) => {
    res.send("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});