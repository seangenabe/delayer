let Delayer

try {
  Delayer = require('./delayer')
}
catch (err) {
  if (err instanceof SyntaxError) {
    Delayer = require('./delayer-node6-compat')
  }
  else {
    throw err
  }
}

if (require.main === module) {
  Delayer.cli()
}

module.exports = Delayer
