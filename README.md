# HttpError

HTTP aware error class `HttpError` for all your Node.js applications.

## Purpose

The HttpError serves two purposes. First to attach a status `code` to error
objects in one single operation, and second to encapsulate lower lever errors in
application specific errors that can be presented to users without decoupling or
loss of important technical details.

```js
const HttpError = require('http-error');
const express = require('express');

const app = express();

app.get('/some/route', function(req, res, next) {
  db.get({…}, function(err, data) {
    if (err) {
      return next(new HttpError('Database Query Failed', 500, err));
    }

    if (!data) {
      return next(new HttpError('Object Not Found', 404));
    }

    // do work here
  });
});

app.use(function(req, res, next, httpError) {
  // print system errors to stderr
  if (httpError.code > 500) {
    if (httpError.error) {
      console.error(httpError.error.message);
      console.error(httpError.error.stack);
    } else {
      console.error(httpError.message);
      console.error(httpError.stack);
    }
  }

  res.status(httpError.code);
  res.end();
});
```

## [MIT Licensed](https://github.com/Starefossen/node-http-error/blob/master/LICENSE)
