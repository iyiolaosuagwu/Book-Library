const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.image = !isEmpty(data.image) ? data.image : '';
  data.isbn = !isEmpty(data.isbn) ? data.isbn : '';
  data.description = !isEmpty(data.description) ? data.description : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Book title field is required';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = ' Book image field is required';
  }

  if (Validator.isEmpty(data.isbn)) {
    errors.isbn = 'Book isbn field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Book description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};