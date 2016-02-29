'use strict'

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

}

Delayer.cli = async function(argv) {
  try {
    let args = argv.slice(2)
    if (args.length === 0) return
    let delay = parseInt(args[0])
    if (delay < 0) return
    let d = new Delayer(delay)
    await d.promise
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (require.main === module) {
  Delayer.cli()
}

module.exports = Delayer
