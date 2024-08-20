const supertest = require('supertest');
const app = require('../src/index'); 
const { createTestUser, removeTestUser } = require('../src/utils/test-util'); 

describe('POST /api/v1/register', function () {
    afterEach(async () => {
        await removeTestUser();
    });

    it('Should register a new user', async () => {
        const result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com',
                role: 'frontend'
            });

        expect(result.status).toBe(201);
       
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: '',
                password: '',
                email: '',
                role: ''
            });

        expect(result.status).toBe(400);
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com',
                role: 'frontend'
            });

        expect(result.status).toBe(201);

        result = await supertest(app)
            .post('/api/v1/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com',
                role: 'frontend'
            });

        expect(result.status).toBe(400);
        
    });
});

describe('POST /api/v1/login', function () {
    beforeEach(async () => {
        await createTestUser(); 
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should login a user', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(result.status).toBe(200);
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: '',
                password: ''
            });

        expect(result.status).toBe(400);
        
    });

    it('should reject if username is incorrect', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'wronguser',
                password: 'password123'
            });

        expect(result.status).toBe(400);
         
    });

    it('should reject if password is incorrect', async () => {
        const result = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });

        expect(result.status).toBe(400);
        
    });
});
