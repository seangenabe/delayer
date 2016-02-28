'use module'

class Delayer {

  constructor(delay) {
    this.delay = delay

    this.promise = new Promise((resolve, reject) => {
      let timeoutID = setTimeout(() => {
        resolve()
      }, delay)

      this.cancel = () => {
        clearTimeout(timeoutID)
        let err = new Error("Delayer cancelled.")
        err.setByDelayer = Delayer
        reject(err)
      }
    })
  }

  static async console() {
    let args = process.argv.slice(2)
    if (args.length === 0) return
    let delay = parseInt(args[0])
    if (delay < 0) return
    let d = new Delayer(delay)
    await d.promise
  }
}

if (require.main === module) {
  Delayer.console()
}

module.exports = Delayer()
