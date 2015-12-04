'use strict';

class HttpError extends Error {
  constructor(message, code, error) {
    super(message);

    this.code = code || 500;
    this.error = error;
  }

  toString() {
    return `${this.code}: ${this.message}`;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

module.exports = HttpError;
