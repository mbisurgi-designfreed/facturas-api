const expect = require('expect');
const request = require('supertest');

const app = require('../../app');
const Cliente = require('../../models/cliente.model');

const clientes = require('../fixtures/clientes');

let dbClientes;

beforeEach(async () => {
    await Cliente.remove();

    dbClientes = await Cliente.insertMany([clientes[0], clientes[1]]);
});

describe('GET /api/cliente', () => {
    it('should return all clientes', async () => {
        const response = await request(app)
            .get('/api/cliente');
        
            expect(response.status).toBe(200);
            expect(response.body.clientes.length).toBe(2);
    });
});

describe('GET /api/cliente/:id', () => {
    it('should return cliente with given id', async () => {
        const response = await request(app)
            .get(`/api/cliente/${dbClientes[0]._id}`);
        
            expect(response.status).toBe(200);
            expect(response.body.cliente._id).toBe(dbClientes[0]._id.toString());
            expect(response.body.cliente.razonSocial).toBe(dbClientes[0].razonSocial);
    });
});

describe('POST /api/cliente', () => {
    it('should add a new cliente with given values', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .send(clientes[0]);

        expect(response.status).toBe(201);
        expect(response.body.cliente._id).toBeA('string');
        expect(response.body.cliente.razonSocial).toBe(clientes[0].razonSocial);
        expect(response.body.cliente.domicilio).toExist();
        expect(response.body.cliente.cuit).toBe(clientes[0].cuit);
        expect(response.body.cliente.condicionIva).toBe(clientes[0].condicionIva);
        expect(response.body.cliente.telefono).toBe(clientes[0].telefono);
        expect(response.body.cliente.email).toBe(clientes[0].email);
    });

    it('should add a new cliente with default values', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .send(clientes[1]);

        expect(response.status).toBe(201);
        expect(response.body.cliente.domicilio).toExist();
        expect(response.body.cliente.domicilio.geometry).toNotExist();
        expect(response.body.cliente.condicionIva).toBe('cf');
    });

    it('should not add a new cliente without razonSocial', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .send(clientes[2]);

        expect(response.status).toBe(422);
        expect(response.body.err.errors.razonSocial).toExist();
    });

    it('should not add a new cliente with an invalid email', async () => {
        const response = await request(app)
            .post('/api/cliente')
            .send(clientes[3]);

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
            .patch(`/api/cliente/${dbClientes[0]._id}`)
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
            .patch(`/api/cliente/${dbClientes[1]._id}`)
            .send(updates);

        expect(response.status).toBe(200);
        expect(response.body.cliente.domicilio).toNotExist();
        expect(response.body.cliente.telefono).toExist()
        expect(response.body.cliente.telefono).toBe(updates.telefono);
        expect(response.body.cliente.email).toExist();
        expect(response.body.cliente.email).toBe(updates.email);
    });
});