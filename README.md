# microk

Example:

```
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

```

### Credits

**microk** share its origin with another vanilla js testing project: [tressa](https://github.com/WebReflection/tressa) by [Andrea Giammarchi (WebReflection)](https://twitter.com/webreflection).

Read more [JS Vanilla Test Code Coverage](https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121), [Vanilla JS Testing — Part II](https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121).
