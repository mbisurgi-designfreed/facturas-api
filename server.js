const express = require('express');
const parser = require('body-parser');

const PORT = process.env.NODE_ENV || 4000;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
