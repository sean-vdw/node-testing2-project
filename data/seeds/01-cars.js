const cars = [
  { make: 'ferrari', model: 'f430'},
  { make: 'ferrari', model: '458'},
  { make: 'ferrari', model: 'enzo'},
  { make: 'honda', model: 'accord'}
];

exports.cars = cars;

exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(() => {
      return knex('cars').insert(cars)
    });
};
