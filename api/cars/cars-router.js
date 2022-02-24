const router = require('express').Router();
const Cars = require('./cars-model');
const { checkId, checkPayload } = require('./cars-middleware');

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => {
      res.json(cars);
    })
    .catch(next);
});

router.get('/:id', checkId, (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then(car => {
      res.json(car);
    })
    .catch(next);
});

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const newCar = await Cars.add({ make: req.body.make.trim(), model: req.body.model.trim() });
    res.status(201).json(newCar);
  } catch(err) {
    next(err);
  };
});

router.delete('/:id', checkId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCar = await Cars.remove(id);
    res.json(deletedCar);
  } catch(err) {
    next(err);
  };
});

module.exports = router;