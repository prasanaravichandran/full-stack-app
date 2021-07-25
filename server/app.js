/**
 * Backend service based on GraphQL
 */
// To set the config variables in config
require('./config/setConfigENV');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const dbConnection = require('./models/connection');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Router file
const routes = require('./routes/router');
routes.initialize(app);

// To display static files
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// To listen to the respective port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});