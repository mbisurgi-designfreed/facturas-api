const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');

// const PORT = process.env.NODE_ENV || 4000;

const app = express();

mongoose.connect(config.mongo.url);

require('./config/passport/passport');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth.route')(app);

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });

module.exports = app;
