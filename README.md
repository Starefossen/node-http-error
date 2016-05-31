# HttpError

[![Build status](https://img.shields.io/wercker/ci/566166f590c1072f350993d2.svg "Build status")](https://app.wercker.com/project/bykey/9cf398f236208de61be9815bd091bc97)
[![Codacy](https://img.shields.io/codacy/a04da1d7b2d44e1abb980f8ceed99711.svg "Codacy")](https://www.codacy.com/app/starefossen/node-http-error)
[![NPM downloads](https://img.shields.io/npm/dm/@starefossen/http-error.svg "NPM downloads")](https://www.npmjs.com/package/@starefossen/http-error)
[![NPM version](https://img.shields.io/npm/v/@starefossen/http-error.svg "NPM version")](https://www.npmjs.com/package/@starefossen/http-error)
[![Node version](https://img.shields.io/node/v/@starefossen/http-error.svg "Node version")](https://www.npmjs.com/package/@starefossen/http-error)
[![Dependency status](https://img.shields.io/david/Starefossen/node-http-error.svg "Dependency status")](https://david-dm.org/Starefossen/node-http-error)

HTTP aware `Error` class `HttpError` for all your Node.js applications.

## Purpose

The HttpError serves two purposes. First to attach a status `code` to error
objects in one single operation, and second to encapsulate lower lever errors in
application specific errors that can be presented to users without decoupling or
loss of important technical details.

## Install

```
$ npm install --save @starefossen/http-error
```

## Usage

```js
const HttpError = require('@starefossen/http-error');
const express = require('express');

const app = express();

app.get('/some/route', function(req, res, next) {
  db.get({…}, function(err, data) {
    if (err) { return next(new HttpError('Database Query Failed', 500, err)); }
    if (!data) { return next(new HttpError('Object Not Found', 404)); }

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
