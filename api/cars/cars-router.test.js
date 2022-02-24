const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('[GET] /cars', () => {
  it('should return 200 OK status', async () => {
    const res = await request(server).get('/api/cars');
    expect(res.status).toBe(200);
  });
});