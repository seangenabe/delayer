# delayer

Create a cancellable promise that will be resolved in a specified amount of time.

## Usage

### API
    var Delayer = require('delayer')

#### Constructor

    var d = new Delayer(delay)

* `delay`: The amount of time to delay, in milliseconds.

#### `d.promise`

A reference to the created `Promise` object.

#### `d.delay`

The delay passed to the Delayer.

#### `d.cancel()`

Cancels the delayed promise. This will put the promise in a rejected state.

#### `Delayer.console()`

Invokes the CLI.

### CLI

    delayer [delay]

## License

MIT
