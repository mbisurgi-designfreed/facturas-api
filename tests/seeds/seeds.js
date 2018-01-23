const { ObjectID } = require('mongodb');

const User = require('../../models/user.model');
const Cliente = require('../../models/cliente.model');

user1Id = new ObjectID();
user2Id = new ObjectID();

const users = [{
    _id: user1Id,
    email: 'mbisurgi@bc-group.com.ar',
    password: 'maximati12'
}, {
    _id: user2Id,
    email: 'cbisurgi@bc-group.com.ar',
    password: 'maximati12'
}];

const clientes = [{
    _id: new ObjectID(),
    razonSocial: 'Maximiliano Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.811759, -58.468448]
        }
    },
    cuit: '20-33899255-7',
    condicionIva: 'rs',
    telefono: '1161984525',
    email: 'mbisurgi@bc-group.com.ar',
    user: user1Id
}, {
    _id: new ObjectID(),
    razonSocial: 'Claudio Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    cuit: '20-14315108-6',
    user: user1Id
}, {
    _id: new ObjectID(),
    razonSocial: 'Matias Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    cuit: '20-14315108-6',
    email: 'matiasbisurgi',
    user: user2Id
}, {
    razonSocial: 'Maximiliano Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.811759, -58.468448]
        }
    },
    cuit: '20-33899255-7',
    condicionIva: 'rs',
    telefono: '1161984525',
    email: 'mbisurgi@bc-group.com.ar'
}, {
    razonSocial: 'Claudio Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    cuit: '20-14315108-6'
}, {
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    cuit: '20-14315108-6'
}, {
    razonSocial: 'Matias Bisurgi',
    domicilio: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    cuit: '20-14315108-6',
    email: 'matiasbisurgi'
}];

populateUsers = (done) => {
    User.remove()
        .then(() => {
            const user1 = new User(users[0]).save();
            const user2 = new User(users[1]).save();

            return Promise.all([user1, user2]);
        })
        .then((res) => done())
        .catch((err) => done(err));
};

populateClientes = (done) => {
    Cliente.remove()
        .then(() => {
            const cliente1 = new Cliente(clientes[0]).save();
            const cliente2 = new Cliente(clientes[1]).save();

            return Promise.all([cliente1, cliente2]);
        })
        .then((res) => done())
        .catch((err) => done(err));
};

module.exports = { users, clientes, populateUsers, populateClientes };