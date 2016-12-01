const test = require('ava')
const Delayer = require('..')
const Promise = require('./promise') // https://github.com/avajs/ava/issues/947

const promiseSpecies = Object.getOwnPropertyDescriptor(Promise, Symbol.species)
const speciesSupport = promiseSpecies && 'get' in promiseSpecies && Promise[Symbol.species] === Promise

test('create a new instance of Delayer', t => {
  let d = new Delayer(4)
  // ok to create new instance
  t.is(typeof d, 'object')
  t.true(d instanceof Delayer)
  if (speciesSupport) {
    t.true(Delayer.prototype instanceof Promise)
    t.true(d instanceof Promise)
  }
  t.is(d.delay, 4)
  // not ok to be called as a function
  t.throws(() => Delayer(4))
})

test('can be created without arguments', t => {
  let d = new Delayer()
  t.true(d.delay === 0)
})

test('resolves after the specified amount of time', async t => {
  const DURATION = 200
  let time = process.hrtime()
  let d = new Delayer(DURATION)
  await d
  let diff = process.hrtime(time)
  t.true(diff[0] < 5)
})

test('should be cancellable', async t => {
  const SHORT_DURATION = 200
  const LONG_DURATION = 1000
  let time = process.hrtime()
  let d = new Delayer(LONG_DURATION)
  setTimeout(() => {
    d.cancel()
  }, SHORT_DURATION)
  try {
    await d
    t.fail()
  }
  catch (err) {
    let diff = process.hrtime(time)
    t.true(diff[0] < 5)
    t.true(err instanceof Error && err.message === "Delayer cancelled.")
  }
})
