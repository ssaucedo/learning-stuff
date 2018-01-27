
function* asyncBlock () {
  var res = yield [Promise.resolve(1), Promise.resolve(2)]
  console.log(res) // => [1,2]
  var a = yield {a: false}
  console.log(a) // {a: false}
}

function next (gen, res) {
  let yielded = gen.next(res)
  if (!yielded.done) {
    if (yielded.value && isPromise(yielded.value)) {
      resolvePromise(yielded.value, gen)
    } else if (Array.isArray(yielded.value)) {
      if (yielded.value.every(isPromise)) {
        resolvePromise(Promise.all(yielded.value), gen)
      } else {
        next(gen, yielded.value)
      }
    } else {
      next(gen, yielded.value)
    }
  }
}

function resolvePromise (val, gen) {
  val.then(r => {
    next(gen, r)
  })
}

function isPromise (val) {
  return typeof val.then === 'function'

}

function asyncCodeExecutor (gen) {
  next(gen, arguments)
}

asyncCodeExecutor(asyncBlock())