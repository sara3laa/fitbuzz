const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/fitbuzz';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);
module.exports = app;
