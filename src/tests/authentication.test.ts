import app from '../app';
import httpStatus from 'http-status';
import request from 'supertest';

describe('Test Authentication', () => {
  it('Register a new user - success', async () => {
    const userData = {
      name: 'ali',
      email: 'ali@mail.com',
      password: 'password123',
    };
    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
