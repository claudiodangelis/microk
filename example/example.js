const { ok, test, beforeEach, afterEach } = require('../')

var myAsyncFunc = function (callback) {
    setTimeout(() => {
        callback(true)
    }, 30)
}

// The assertion is true, does not produce any output
ok(1 === 1)
// This second assertion will fail, and will print
//  NOT OK: #2
ok(1 === 2)
// Add a label
ok(2 === 1, 'two equals one')
// Add an `extra` paramter. If the assertion fails, the extra paramter will be
// invoked if it's a function, or echoed otherwise
let value = 'my value'
ok(value === 'the value', 'value is correct (first test)', value)
// ...or...
ok(value === 'value', 'value is correct (second test)', () => {
    console.log('actual value is:', value)
})
