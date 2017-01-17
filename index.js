import { test, beforeEach, afterEach, ok } from './lib/microk'

let myAsyncFunc = (callback) => {
  setTimeout(() => {
    callback(true)
  }, 3000)
}

ok(1 === 1, 'You can have quick unsuited assertions')

beforeEach((done) => {
  // Initializing a databse, very heavy operation
  setTimeout(() => {
    done()
  }, 2000)
})

afterEach(() => {
  // Clean the database
})

test((ok, done) => {
  ok(true === true, 'preliminary conditions are ready to start myAsyncFunc')
  myAsyncFunc((value) => {
    ok(value === true, 'Async function returned true')
    done()
  })
})

test('obvious suite', (ok) => {
  ok(1 === 1, 'One should equal one')
  ok(2 === 2, 'Two should equal two')
  ok(3 === 3, 'Three should equal three')
})

test((ok) => {
  ok(1 === 1, 'Two should equal one')
})
