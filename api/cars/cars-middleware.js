const Cars = require('./cars-model');

exports.checkId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.getById(id);
    if(!car) {
      next({ status: 404, message: `car with id of ${id} not found` })
    } else {
      next();
    }
  } catch(err) {
    next(err);
  };
};

exports.checkPayload = async (req, res, next) => {
  const { make, model } = req.body;
  try {
    if(make === null || make === undefined || make.trim() === '') {
      next({ status: 400, message: 'car make is required' })
    } else if (model === null || model === undefined || model.trim() === '') {
      next({ status: 400, message: 'car model is required' })
    } else {
      next();
    }
  } catch(err) {
    next(err);
  };
};