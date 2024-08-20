const supertest = require('supertest');
const app = require('../src/index'); 
const { createTestUser, removeTestUser, 
    createTestProject, removeTestProjects } = require('../src/utils/test-util'); 

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

describe('Project Endpoints', () => {
    let token;

    beforeAll(async () => {
        await createTestUser();
        const loginResponse = await supertest(app)
            .post('/api/v1/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        token = loginResponse.body.data.access_token;
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestProjects();
    });

    describe('POST /api/v1/proyek', () => {
        it('Should create a new project', async () => {
            const response = await supertest(app)
                .post('/api/v1/proyek')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'New Project',
                    description: 'Description for new project'
                });

            expect(response.status).toBe(201);

        });

        it('should reject if request is invalid', async () => {
            const response = await supertest(app)
                .post('/api/v1/proyek')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: '', // Invalid name
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/v1/proyek', () => {
        beforeEach(async () => {
            await createTestProject();
        });

        it('Should get all projects', async () => {
            const response = await supertest(app)
                .get('/api/v1/proyek')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);

        });

        it('Should get a project by ID', async () => {
            const createdProject = await supertest(app)
                .post('/api/v1/proyek')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Project By ID',
                    description: 'Description for project by ID'
                });

            const response = await supertest(app)
                .get(`/api/v1/proyek/${createdProject.body.data.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);

        });
    });

    describe('PUT /api/v1/proyek/:id', () => {
        let projectId;

        beforeEach(async () => {
            const createdProject = await supertest(app)
                .post('/api/v1/proyek')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Project To Update',
                    description: 'Description for project to update'
                });
            projectId = createdProject.body.data.id;
        });

        it('Should update a project', async () => {
            const response = await supertest(app)
                .put(`/api/v1/proyek/${projectId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated Project',
                    description: 'Updated description for project'
                });

            expect(response.status).toBe(200);

        });

        it('should reject if request is invalid', async () => {
            const response = await supertest(app)
                .put(`/api/v1/proyek/${projectId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: '' // Invalid name
                });

            expect(response.status).toBe(400);
        });
    });

    
});

