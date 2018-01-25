const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');

const app = express();

mongoose.connect(config.mongo.url);

require('./config/passport/passport');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth.route')(app);
require('./routes/cliente.route')(app);

module.exports = app;
