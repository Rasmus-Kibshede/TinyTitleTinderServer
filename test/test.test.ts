// login.test.ts

import request from 'supertest';
import express from 'express';

const app = express();

// Mock the authSignin function (assuming it's in the same file for simplicity)
jest.mock('../src/Services/authService', () => ({
  authSignin: jest.fn(),
}));

describe('Login Service', () => {
  it('should return a valid JWT token on successful login', async () => {
    const user = { /* create a valid user object for testing */ };
    const response = await request(app)
      .post('/login')
      .send({ user }); // Adjust the route if necessary

    expect(response.status).toBe(200);
    expect(response.header['authorization']).toMatch(/^Bearer /);
    expect(typeof response.body.token).toBe('string');
  });

  it('should return an error on failed login', async () => {
    // Mock authSignin to throw an error (simulate a failed login)
    const mockAuthSignin = jest.fn(() => {
      throw new Error('Invalid credentials');
    });
    jest.mock('./your-login-service-file', () => ({
      authSignin: mockAuthSignin,
    }));

    const user = { /* create an invalid user object for testing */ };
    const response = await request(app)
      .post('/login')
      .send({ user }); // Adjust the route if necessary

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });
});
