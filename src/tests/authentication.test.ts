import app from '../app';
import { userService } from '../services/user.service';
import { createRefreshToken } from '../utils/auth.utils';
import httpStatus from 'http-status';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

let mongoServer = MongoMemoryServer.create({
  binary: {
    version: '6.0.15',
  },
});
let db: MongoMemoryServer | null;

const dbConnect = async () => {
  db = await mongoServer;
  const uri = db.getUri();

  await mongoose.connect(uri, {});
};

const dbDisconnect = async () => {
  if (db) {
    await mongoose.connection.close();
    await db.stop();
  }
};

describe('Test Authentication', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  it('Register a new user - success', async () => {
    const userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };

    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it('Register a new user - failed', async () => {
    const userData = {
      name: 'ali',
      email: 'ali@mail.com',
      password: 'password123',
    };

    await userService.createUser(userData);
    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('Login a user - success', async () => {
    let userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };

    await userService.createUser(userData);

    const response = await request(app).post('/api/auth/login').send(userData);
    expect(response.status).toBe(httpStatus.OK);
  });

  it('Login a user - failed', async () => {
    let userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };

    await userService.createUser(userData);
    userData['password'] = 'wrong password';

    const response = await request(app).post('/api/auth/login').send(userData);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Refresh a token - success', async () => {
    const userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };
    const user = await userService.createUser(userData);

    let data = {
      refreshToken: createRefreshToken(user),
    };

    const response = await request(app).post('/api/auth/refresh').send(data);
    expect(response.status).toBe(httpStatus.OK);
  });

  it('Refresh a token - success', async () => {
    const userData = {
      name: 'ali',
      email: 'ali1@mail.com',
      password: 'password123',
    };
    const user = await userService.createUser(userData);

    let data = {
      refreshToken: createRefreshToken(user) + 'wrong',
    };

    const response = await request(app).post('/api/auth/refresh').send(data);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
