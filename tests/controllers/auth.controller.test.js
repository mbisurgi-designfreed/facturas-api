const expect = require('expect');
const request = require('supertest');

const app = require('../../app');
const User = require('../../models/user.model');

let user;

beforeEach(async () => {
    await User.remove();

    user = await new User({ email: 'matias@designfreed.com', password: 'maximati' }).save();
});

describe('POST /signup', () => {
    it('should add a new user', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ email: 'maximiliano@designfreed.com', password: 'maximati' });

        expect(response.status).toBe(201);
        expect(response.body.token).toBeA('string');
    });

    it('should not add a user without email or password', async () => {
        const response = await request(app)
            .post('/signup')
            .send({});

        expect(response.status).toBe(422);
        expect(response.body.err.errors.email).toExist();
        expect(response.body.err.errors.password).toExist();
    });

    it('should not add two users with same email', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ email: 'matias@designfreed.com', password: 'maximati' });

        expect(response.status).toBe(422);
        expect(response.body.err).toBe('Email existente.');
    });
});

describe('POST /signin', () => {
    it('should sign in with valid credentials', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ email: 'matias@designfreed.com', password: 'maximati' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeA('string');
    });

    it('should not sign in with invalid credentials', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ email: 'matias@designfreed.com', password: '123456' });
        
        expect(response.status).toBe(401);
        expect(response.body.token).toNotExist();
    });
});