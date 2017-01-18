const { ok, test, beforeEach, afterEach } = require('../')

var myAsyncFunc = function (callback) {
    setTimeout(() => {
        callback(true)
    }, 30)
}

ok(2 === 1, 'You can have quick unsuited assertions')

beforeEach(function (done) {
    // Initializing a databse, very heavy operation
    setTimeout(function () {
        done()
    }, 10)
})

afterEach(function () {
    // Clean the database
})

test('my suite', function (ok, done) {
    ok(true === true, 'preliminary conditions are ready to start myAsyncFunc')
    myAsyncFunc(function (value) {
        ok(value === true, 'Async function returned true')
        done()
    })
})

test('obvious suite', function (ok) {
    ok(1 === 1, 'One should equal one')
    ok(2 === 2, 'Two should equal two')
    ok(3 === 3, 'Three should equal three')
})

test('the very last', function (ok) {
    ok(1 === 1, 'One should equal one')
})
