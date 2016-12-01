let Delayer

if ('species' in Symbol) {
  Delayer = require('./delayer')
}
else {
  Delayer = require('./delayer-node6-compat')
}

if (require.main === module) {
  Delayer.cli()
}

module.exports = Delayer
