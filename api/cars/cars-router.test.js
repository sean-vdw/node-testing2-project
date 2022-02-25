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
  it('should return 200 OK status if valid id is entered', async () => {
    const res = await request(server).get('/api/cars/2');
    expect(res.status).toBe(200);
  });
  
  it('should return the requested car by id', async () => {
    const res = await request(server).get('/api/cars/1');
    expect(res.body).toStrictEqual({ id: 1, make: 'ferrari', model: 'f430' });
  });

  it('should return an error if an invalid id is entered', async () => {
    const res = await request(server).get('/api/cars/2000');
    expect(res.status).toBe(404);
  });
});

describe('[POST] /cars', () => {
  it('should return status 201 if new car is added successfully', async () => {
    const res = await request(server).post('/api/cars').send({ make: 'GMC', model: 'yukon' });
    expect(res.status).toBe(201);
  });

  it('should return an error if model is undefined', async () => {
    const res = await request(server).post('/api/cars').send({ make: 'subaru' });
    expect(res.error).toBeTruthy();
  });

  it('should return an error if make is undefined', async () => {
    const res = await request(server).post('/api/cars').send({ model: 'outback' });
    expect(res.status).toBe(400);
  })
});

describe('[DELETE] /cars/:id', () => {
  it('should return status 200 if car is successfully deleted', async () => {
    const res = await request(server).delete('/api/cars/1');
    expect(res.status).toBe(200);
  });

  it('should return an error if the id is incorrect', async () => {
    const res = await request(server).delete('/api/cars/0');
    expect(res.error).toBeTruthy();
  });
});