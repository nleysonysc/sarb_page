  export default class gsQueue {
    constructor(concurrency) {
      this.activeCalls = 0
      this.waitingCalls = []
      this.concurrency = concurrency
    }

    push(gsFuncName, successHandler, ...functionArgs) {
      if (this.activeCalls < this.concurrency){
        google.script.run.withSuccessHandler(this.clearOnComplete(successHandler))[gsFuncName](...functionArgs)
        this.activeCalls++
      }
      else {
        this.waitingCalls.push([...arguments])
      }
    }

    clearOnComplete(successHandler){
      return (returnedFromGS) => {
        this.activeCalls--
        if (this.waitingCalls.length > 0) {
          this.push(...this.waitingCalls.shift())
        }
        successHandler(returnedFromGS)
      }
    }
  }

// EX
//   let q = new gsQueue(30)
//   for (let i = 1900;i<1974;i++){
//     q.push('getLettersById', (e)=> {console.log(i);console.log(e)}, i)
//   }