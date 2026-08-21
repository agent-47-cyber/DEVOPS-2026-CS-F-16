import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../server.js';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';

const TEST_DB_URI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/portfolio_db_test';
const TEST_JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_rtu_capstone_2026';

let authToken = '';
let testProjectId = '';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_DB_URI);
  }

  // Ensure isolated test admin exists
  await Admin.deleteMany({});
  const hashedPassword = await bcrypt.hash('testPassword123', 10);
  await Admin.create({
    username: 'testadmin',
    passwordHash: hashedPassword,
  });

  // Generate valid test JWT
  authToken = jwt.sign(
    { id: new mongoose.Types.ObjectId(), username: 'testadmin' },
    TEST_JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Seed one test project
  await Project.deleteMany({});
  const sampleProj = await Project.create({
    title: 'Test Portfolio System',
    description: 'Automated test project instance',
    techStack: ['React', 'Node.js', 'Jest'],
    repoUrl: 'https://github.com/test/repo',
    liveUrl: 'https://test.live',
    featured: true,
    order: 1,
  });
  testProjectId = sampleProj._id.toString();

  // Seed sample skill
  await Skill.deleteMany({});
  await Skill.create({
    name: 'Jest Automation',
    category: 'DevOps & Cloud Automation',
    level: 'Advanced',
  });

  // Clear messages in test DB
  await Message.deleteMany({});
});

afterAll(async () => {
  try {
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Message.deleteMany({});
    await mongoose.connection.close();
  } catch (_e) {
    // Ignore teardown close errors
  }
});

describe('1. Health & Status Endpoints', () => {
  test('GET /api/health returns 200 OK and health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET / returns 200 OK root message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});

describe('2. Public Projects REST API', () => {
  test('GET /api/projects returns collection of projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('title');
  });

  test('GET /api/projects/:id returns single project with valid ID', async () => {
    const res = await request(app).get(`/api/projects/${testProjectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', testProjectId);
    expect(res.body).toHaveProperty('title', 'Test Portfolio System');
  });

  test('GET /api/projects/:id returns 404 for nonexistent ID', async () => {
    const nonexistentId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/projects/${nonexistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Project not found.');
  });
});

describe('3. Public Skills REST API', () => {
  test('GET /api/skills returns list of skills', async () => {
    const res = await request(app).get('/api/skills');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('name', 'Jest Automation');
  });
});

describe('4. Contact Inquiries REST API', () => {
  test('POST /api/messages creates a contact submission with valid payload', async () => {
    const payload = {
      name: 'Automated Tester',
      email: 'tester@example.com',
      message: 'Hello, this is an automated CI verification message.',
    };

    const res = await request(app).post('/api/messages').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Message sent successfully.');
    expect(res.body.data).toHaveProperty('name', payload.name);
    expect(res.body.data).toHaveProperty('email', payload.email);
    expect(res.body.data).toHaveProperty('read', false);
  });

  test('POST /api/messages returns 400 Bad Request when required fields are missing', async () => {
    const incompletePayload = {
      name: 'Missing Fields Tester',
    };

    const res = await request(app).post('/api/messages').send(incompletePayload);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('5. Authentication & JWT Security', () => {
  test('POST /api/auth/login succeeds with valid test credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testadmin',
      password: 'testPassword123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'testadmin');
    expect(res.body.user).not.toHaveProperty('password');
    expect(res.body.user).not.toHaveProperty('passwordHash');
  });

  test('POST /api/auth/login fails with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testadmin',
      password: 'wrongPasswordAttempt',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials.');
  });
});

describe('6. Protected Admin Endpoints & Authorization Boundary', () => {
  test('POST /api/projects rejects unauthenticated request with 401', async () => {
    const res = await request(app).post('/api/projects').send({
      title: 'Unauthorized Project Attempt',
      description: 'Should fail',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/projects creates project when authenticated with valid Bearer token', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'CI Created Project',
        description: 'Created through authenticated supertest pipeline',
        techStack: ['CI', 'Jest'],
        featured: false,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'CI Created Project');
  });

  test('GET /api/messages rejects unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/messages');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/messages returns inquiries when authenticated with Bearer token', async () => {
    const res = await request(app)
      .get('/api/messages')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('7. Message Read Status & Protected Mutation', () => {
  let messageId = '';

  beforeAll(async () => {
    const msg = await Message.create({
      name: 'Status Test User',
      email: 'status@example.com',
      message: 'Testing read status mutation.',
      read: false,
    });
    messageId = msg._id.toString();
  });

  test('PATCH /api/messages/:id/read rejects unauthenticated request with 401', async () => {
    const res = await request(app).patch(`/api/messages/${messageId}/read`);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('PATCH /api/messages/:id/read marks message as read when authenticated', async () => {
    const res = await request(app)
      .patch(`/api/messages/${messageId}/read`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', messageId);
    expect(res.body).toHaveProperty('read', true);
  });

  test('PATCH /api/messages/:id/read returns 404 for nonexistent message ID', async () => {
    const nonexistentId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .patch(`/api/messages/${nonexistentId}/read`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Message not found.');
  });
});
