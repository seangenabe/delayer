# delayer

Create a cancellable promise that will be resolved in a specified amount of time.

[![npm](https://img.shields.io/npm/v/delayer.svg?style=flat-square)](https://www.npmjs.com/package/delayer)
[![Build Status](https://travis-ci.org/seangenabe/delayer.svg?branch=master)](https://travis-ci.org/seangenabe/delayer)
[![Dependency Status](https://david-dm.org/seangenabe/delayer.svg)](https://david-dm.org/seangenabe/delayer)
[![devDependency Status](https://david-dm.org/seangenabe/delayer/dev-status.svg)](https://david-dm.org/seangenabe/delayer#info=devDependencies)
[![node](https://img.shields.io/node/v/delayer.svg?style=flat-square)](https://nodejs.org/en/download/)

## Usage

### API
    const Delayer = require('delayer')

#### Constructor

    let d = new Delayer(delay)

* `delay`: The amount of time to delay, in milliseconds.

#### `d.promise`

A reference to the created `Promise` object.

#### `d.delay`

The delay passed to the Delayer.

#### `d.cancel()`

Cancels the delayed promise. This will put the promise in a rejected state.

### CLI

    delayer [delay]

## License

MIT
