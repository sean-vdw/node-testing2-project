const db = require('../../data/db-config');

function getAll() {
  return db('cars');
};

function getById() {
  return db('cars').where('id', id).first();
};

async function add(car) {
  return db('cars').insert(car)
    .then(([id]) => {
      return db('cars').where('id', id).first();
    });
};

async function update(id, updates) {
  return db('cars').where('id', id).update(updates)
    .then(() => {
      return getById(id);
    });
};

function remove(id) {
  return db('cars').where('id', id).del();
};

module.exports = {
  getAll,
  getById,
  add,
  remove
};