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

  it('should return 4 cars', async () => {
    const res = await request(server).get('/api/cars');
    expect(res.body).toHaveLength(4);
  });
});

describe('[GET] /cars/:id', () => {
  it('should return the requested car by id', async () => {
    const res = await request(server).get('/api/cars/1');
    console.log(res);
    expect(res.body).toStrictEqual({ id: 1, make: 'ferrari', model: 'f430' });
  });
});