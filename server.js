const app = require('./app');

const PORT = process.env.NODE_ENV || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});