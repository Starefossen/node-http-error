'use strict';

const assert = require('assert');
const HttpError = require('.');

describe('HttpError', () => {
  it('returns new HttpError', () => {
    const httpError = new HttpError('Not Found', 404);

    assert.equal(httpError.message, 'Not Found');
    assert.equal(httpError.code, 404);
  });

  it('returns json representation', () => {
    const httpError = new HttpError('Not Found', 404);

    assert.deepEqual(httpError.toJSON(), {
      code: 404,
      message: 'Not Found',
    });
  });

  it('returns string representation', () => {
    const httpError = new HttpError('Not Found', 404);

    assert.equal(httpError.toString(), '404: Not Found');
  });

  it('wraps existing error', () => {
    const error = new Error('Original Error');
    const httpError = new HttpError('Not Found', 404, error);

    assert.deepEqual(error, httpError.error);
  });
});
