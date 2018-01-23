const passport = require('passport');

const ClienteController = require('../controllers/cliente.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/cliente', jwtAuth, ClienteController.list);
    app.get('/api/cliente/:id', jwtAuth, ClienteController.getById);
    app.post('/api/cliente', jwtAuth, ClienteController.insert);
    app.patch('/api/cliente/:id', jwtAuth, ClienteController.update);
};