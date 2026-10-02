const request = require('supertest');
const app = require('../src/app');

describe('E2E Tests: API Endpoints', () => {
  test('GET /health should return 200 and status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET /api/add?a=5&b=10 should return 15', async () => {
    const response = await request(app).get('/api/add?a=5&b=10');
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(15);
  });
});
