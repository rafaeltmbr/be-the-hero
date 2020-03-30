/* eslint-disable no-undef */
let request = require('supertest');

const app = require('../../src/app');
const dbConnection = require('../../src/database/connection');

request = request(app);

describe('ONG', () => {
  beforeAll(async () => {});

  beforeEach(async () => {
    await dbConnection.migrate.latest();
  });

  afterEach(async () => {
    await dbConnection.migrate.rollback();
  });

  it('should create a new ONG', async () => {
    const ongData = {
      name: 'ONG TEST',
      email: 'contact@ongtest.com',
      whatsapp: '5511988776655',
      city: 'São Paulo',
      uf: 'SP',
    };

    const res = await request.post('/ongs').send(ongData);

    expect(res.body).toHaveProperty('ong_id');
    expect(res.body.ong_id).toHaveLength(8);

    const { id } = await dbConnection('ongs').select('id').first();
    expect(id).toHaveLength(8);
  });
});

describe('INCIDENTS', () => {
  let ongId;

  beforeAll(async () => {
    await dbConnection.migrate.latest();

    await request.post('/ongs').send({
      name: 'APAD',
      email: 'contato@apad.com',
      whatsapp: '47988912960',
      city: 'Rio do Sul',
      uf: 'SC',
    });

    const { id } = await dbConnection('ongs').select('id').first();
    ongId = id;
  });

  beforeEach(async () => {
    await dbConnection.migrate.latest();
  });

  afterEach(async () => {
    await dbConnection.migrate.rollback();
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  it('should create a new incident', async () => {
    const incident = {
      title: 'Bad cat',
      description: 'Bad is a good cat that is sick after got the cats flu',
      value: 100,
    };

    const res = await request.post('/incidents').send(incident).set('Authorization', ongId);
    expect(res.body).toHaveProperty('id');
  });
});
