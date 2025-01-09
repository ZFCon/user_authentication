import app from '../app';
import connectDB from '../config/db.config';
import httpStatus from 'http-status';
import request from 'supertest';

let server: any;

beforeAll(async () => {
  await connectDB();
  server = app.listen(0);
});

afterAll(async () => {
  await server.close();
});

describe('Test Authentication', () => {
  it('Register a new user - success', async () => {
    const userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };

    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
