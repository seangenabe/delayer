var chai = require('chai')
var Delayer = require('..')

chai.use(require('chai-as-promised'))
var expect = chai.expect

describe('delayer', function() {

  describe('constructor', function() {

    it('should be able to create a new instance', function() {
      var d = new Delayer(4)
      expect(d).to.be.an.instanceof(Delayer)
    })

    it('shoudn\'t be called as a function', function() {
      try {
        var d = Delayer(4)
        expect(false).to.be.true
      }
      catch (err) {
        expect(true).to.be.true
      }
    })

    it('should be able to be created with null', function() {
      var d = new Delayer()
      expect(d).to.be.an.instanceof(Delayer)
    })

  })

  describe('promise', function() {
    it('promise should be called', function() {
      var d = new Delayer(500)
      return expect(d.promise).to.become(undefined)
    })
  })

  describe('cancel', function() {
    it('should be cancellable', function() {
      var d = new Delayer(2000)
      d.cancel()
      return expect(d.promise).to.be.rejectedWith(Error, "Delayer cancelled.")
    })
  })

})
