const seeder = require('mongoose-seed');
const config = require('../config/config');

const clientes = require('./data/clientes.json');

seeder.connect(config.mongo.url, () => {
    seeder.loadModels([
        './models/user.model',
        './models/cliente.model'
    ]);

    seeder.clearModels(['cliente'], () => {
        seeder.populateModels(clientes, () => {
            seeder.disconnect();
        });
    });
});

