'use strict';

const assert = require('assert');
const HttpError = require('.');

describe('HttpError', function describe() {
  it('returns new HttpError', function it() {
    const httpError = new HttpError('Not Found', 404);

    assert.equal(httpError.message, 'Not Found');
    assert.equal(httpError.code, 404);
  });

  it('returns json representation', function it() {
    const httpError = new HttpError('Not Found', 404);

    assert.deepEqual(httpError.toJSON(), {
      code: 404,
      message: 'Not Found',
    });
  });

  it('returns string representation', function it() {
    const httpError = new HttpError('Not Found', 404);

    assert.equal(httpError.toString(), '404: Not Found');
  });

  it('wraps existing error', function it() {
    const error = new Error('Original Error');
    const httpError = new HttpError('Not Found', 404, error);

    assert.deepEqual(error, httpError.error);
  });
});
