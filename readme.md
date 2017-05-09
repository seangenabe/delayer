# delayer

DEPRECATED. Please use [delay](https://github.com/sindresorhus/delay) instead.

Create a cancellable promise that will be resolved in a specified amount of time.

[![npm](https://img.shields.io/npm/v/delayer.svg?style=flat-square)](https://www.npmjs.com/package/delayer)
[![Build Status](https://img.shields.io/travis/seangenabe/delayer/master.svg?style=flat-square)](https://travis-ci.org/seangenabe/delayer)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/delayer.svg?style=flat-square)](https://david-dm.org/seangenabe/delayer#info=devDependencies)
[![node](https://img.shields.io/node/v/delayer.svg?style=flat-square)](https://nodejs.org/en/download/)

## API

```javascript
const Delayer = require('delayer')

// example usage
let d = new Delayer(1000)
d.then(onFulfilled, onRejected)
```

On supported environments, `Delayer` extends from `Promise` but returns `Promise` objects from `Promise.prototype` methods.

The weird stuff that led to this disconnect include:
* [`Promise[Symbol.species]`](http://kangax.github.io/compat-table/es6/#test-Promise_Promise[Symbol.species]) - node.js 6.5; Chrome 51

### Constructor

```javascript
let d = new Delayer(delay)
```

Creates a new instance of `Delayer` which creates an associated promise, which either resolves after the specified amount of time or rejects when `cancel` is called.

On supported environments, the associated promise is equivalent to the `Delayer` instance. On older environments, the associated promise is hidden; `Promise` prototype methods are proxied to the promise, making the instance a valid thenable.

Parameters:
* `delay`: The amount of time to delay, in milliseconds.

### `d.delay`

The delay passed to the constructor.

### `d.cancel()`

Cancels the delayed promise. This will put the promise in a rejected state.

## CLI

```bash
delayer [delay]
```
