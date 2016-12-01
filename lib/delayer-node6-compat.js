// @flow

class Delayer {

  constructor(delay: number = 0) {
    let reject
    let timeoutID
    this._promise = new Promise((resolve, reject2) => {
      timeoutID = setTimeout(() => {
        resolve()
      }, delay)

      reject = reject2
    })
    this.cancel = (): void => {
      clearTimeout(timeoutID)
      let err = new Error("Delayer cancelled.")
      err.setByDelayer = Delayer
      reject(err)
    }
    this.delay = delay
  }

  static async cli(argv: string[]): void {
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

  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this._promise.catch(onRejected)
  }

  toString() {
    return 'Delayer'
  }

}

module.exports = Delayer
