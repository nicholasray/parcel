const validator = require('validator');

class Validator {
  static validate(data) {
    let errors = [];

    this.validateName(data.name, errors);
    this.validateEmail(data.email, errors);
    this.validateMessage(data.message, errors);

    return errors;
  }

  static validateName(name, errors) {
    if (validator.isEmpty(name)) {
      errors.push("Name is required")
      return;
    }

    if (!validator.isLength(name, {max: 255})) {
      errors.push("Name cannot exceed 255 characters")
      return;
    }
  }

  static validateEmail(email, errors) {
    if (validator.isEmpty(email)) {
      errors.push("Email is required")
      return;
    }

    if (!validator.isLength(email, {max: 254})) {
      errors.push("Email cannot exceed 254 characters")
      return;
    }

    if (!validator.isEmail(email)) {
      errors.push("Email is invalid")
    }
  }

  static validateMessage(message, errors) {
    if (validator.isEmpty(message )) {
      errors.push("Message is required")
      return;
    }

    if (!validator.isLength(message, {max: 1000})) {
      errors.push("Message cannot exceed 1000 characters")
    }
  }
}

module.exports = Validator;
