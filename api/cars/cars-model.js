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
      return getById(id)
    });
};

async function update(id, updates) {
  return db('cars').where('id', id).update(updates);
};

function remove(id) {
  return null;
};

module.exports = {
  getAll,
  getById,
  add,
  remove
};