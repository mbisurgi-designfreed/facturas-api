const expect = require('expect');
const request = require('supertest');

const app = require('../../app');
const User = require('../../models/user.model');
const Cliente = require('../../models/cliente.model');

const { users, clientes, populateUsers, populateClientes } = require('../seeds/seeds');

let token;

beforeAll(populateUsers);
beforeEach(populateClientes);
beforeEach((done) => {
    request(app)
        .post('/signin')
        .send({ email: users[0].email, password: users[0].password })
        .end((err, res) => {
            if (err) {
                done(err);
            }

            token = res.body.token;
            done();
        });
});

describe('GET /api/cliente', () => {
    it('should return all clientes', async () => {
        const response = await request(app)
            .get('/api/cliente')
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body.clientes.length).toBe(2);
    });
});

describe('GET /api/cliente/:id', () => {
    it('should return cliente with given id', async () => {
        const response = await request(app)
            .get(`/api/cliente/${clientes[0]._id}`)
            .set('authorization', token);

        expect(response.status).toBe(200);
        expect(response.body.cliente._id).toBe(clientes[0]._id.toString());
        expect(response.body.cliente.razonSocial).toBe(clientes[0].razonSocial);
        expect(response.body.cliente.user).toBe(users[0]._id.toString());
    });
});

describe('POST /api/cliente', () => {
    it('should add a new cliente with given values', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .set('authorization', token)
            .send(clientes[3]);

        expect(response.status).toBe(201);
        expect(response.body.cliente._id).toBeA('string');
        expect(response.body.cliente.razonSocial).toBe(clientes[3].razonSocial);
        expect(response.body.cliente.domicilio).toExist();
        expect(response.body.cliente.cuit).toBe(clientes[3].cuit);
        expect(response.body.cliente.condicionIva).toBe(clientes[3].condicionIva);
        expect(response.body.cliente.telefono).toBe(clientes[3].telefono);
        expect(response.body.cliente.email).toBe(clientes[3].email);
        expect(response.body.cliente.user).toBe(users[0]._id.toString());
    });

    it('should add a new cliente with default values', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .set('authorization', token)
            .send(clientes[4]);

        expect(response.status).toBe(201);
        expect(response.body.cliente.domicilio).toExist();
        expect(response.body.cliente.domicilio.geometry).toNotExist();
        expect(response.body.cliente.condicionIva).toBe('cf');
        expect(response.body.cliente.user).toBe(users[0]._id.toString());
    });

    it('should not add a new cliente without razonSocial', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .set('authorization', token)
            .send(clientes[5]);

        expect(response.status).toBe(422);
        expect(response.body.err.errors.razonSocial).toExist();
    });

    it('should not add a new cliente with an invalid email', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .set('authorization', token)
            .send(clientes[6]);

        expect(response.status).toBe(422);
        expect(response.body.err.errors.email).toExist();
    });
});

describe('PATCH /api/cliente/:id', () => {
    it('should update a cliente', async () => {
        const updates = {
            telefono: '1142959090',
            email: 'maximiliano@designfreed.com'
        };

        const response = await request(app)
            .patch(`/api/cliente/${clientes[0]._id}`)
            .set('authorization', token)
            .send(updates);

        expect(response.status).toBe(200);
        expect(response.body.cliente.telefono).toBe(updates.telefono);
        expect(response.body.cliente.email).toBe(updates.email);
    });

    it('should update and add properties on a cliente with missing values', async () => {
        const updates = {
            domicilio: null,
            telefono: '1142959090',
            email: 'maximiliano@designfreed.com'
        };

        const response = await request(app)
            .patch(`/api/cliente/${clientes[1]._id}`)
            .set('authorization', token)
            .send(updates);

        expect(response.status).toBe(200);
        expect(response.body.cliente.domicilio).toNotExist();
        expect(response.body.cliente.telefono).toExist()
        expect(response.body.cliente.telefono).toBe(updates.telefono);
        expect(response.body.cliente.email).toExist();
        expect(response.body.cliente.email).toBe(updates.email);
    });
});