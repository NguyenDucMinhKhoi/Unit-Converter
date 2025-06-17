const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const lengthRoutes = require('./src/routes/lengthRoutes')
const weightRoutes = require('./src/routes/weightRoutes')
const temperatureRoutes = require('./src/routes/temperatureRoutes')

app.use("/api/length", lengthRoutes);
app.use("/api/weight", weightRoutes);
app.use("/api/temperature", temperatureRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;