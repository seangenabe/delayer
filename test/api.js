'use strict'

const test = require('ava')
const Delayer = require('..')

test('create a new instance of Delayer', t => {
  let d = new Delayer(4)
  // ok to create new instance
  t.ok(d instanceof Delayer)
  t.ok(d.delay === 4)
  t.ok(d.promise.constructor.name === 'Promise')
  // not ok to be called as a function
  t.throws(() => Delayer(4))
})

test('can be created without arguments', t => {
  let d = new Delayer()
})

test('resolves after the specified amount of time', async t => {
  const DURATION = 1234
  let now = new Date()
  let d = new Delayer(DURATION)
  await d.promise
  let later = new Date()
  t.ok(Math.abs(later - now - DURATION) < 20)
})

test('should be cancellable', async t => {
  const SHORT_DURATION = 1234
  const LONG_DURATION = 10000
  let now = new Date()
  let d = new Delayer(LONG_DURATION)
  setTimeout(() => {
    d.cancel()
  }, SHORT_DURATION)
  try {
    await d.promise
    t.fail()
  }
  catch (err) {
    let later = new Date()
    t.ok(Math.abs(later - now - SHORT_DURATION) < 20)
    t.ok(err instanceof Error && err.message === "Delayer cancelled.")
  }
})
