
class Delayer {

  constructor(delay) {

    this.delay = delay

    this.promise = new Promise((resolve, reject) => {
      var timeoutID = setTimeout(function() {
        resolve()
      }, delay)

      this.cancel = () => {
        clearTimeout(timeoutID)
        var err = new Error("Delayer cancelled.")
        err.setByDelayer = Delayer
        reject(err)
      }
    })
  }

  static async console() {
    console.log(1)
    var args = process.argv.slice(2)
    if (args.length === 0) return
    var delay = parseInt(args[0])
    if (delay < 0) return
    var d = new Delayer(delay)
    console.log(2)
    await d.promise
    console.log(3)
  }

}

if (require.main === module) {
  Delayer.console()
}

module.exports = Delayer
