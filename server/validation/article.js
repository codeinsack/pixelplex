const isEmpty = require('./isEmpty');

module.exports = function validator(data) {
  const errors = [];

  Object.keys(data).forEach((key) => {
    if (key === 'page' || key === 'limit') {
      if (isNaN(+data[key])) {
        errors.push({
          field: `${key}`,
          error: `${key} must be a number`,
        });
      }
      if (+data[key] <= 0) {
        errors.push({
          field: `${key}`,
          error: `${key} must be a positive number`,
        });
      }
      if (key === 'limit' && +data[key] > 10) {
        errors.push({
          field: `${key}`,
          error: `maximum value of ${key} is 10`,
        });
      }
    }

    if (isEmpty(data[key])) {
      errors.push({
        field: `${key}`,
        error: `${key} is required`,
      });
    }
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
