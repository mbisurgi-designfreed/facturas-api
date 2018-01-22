const passport = require('passport');

const ClienteController = require('../controllers/cliente.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/cliente', ClienteController.list);
    app.get('/api/cliente/:id', ClienteController.getById);
    app.post('/api/cliente', ClienteController.insert);
    app.patch('/api/cliente/:id', ClienteController.update);
};