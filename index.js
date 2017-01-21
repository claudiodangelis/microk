var exitCode = 0,
    suiteCounter = 0,
    okCounter = 0,
    queue = [],
    current = ''
var isAsync = function (item) {
    var waitingForDone
    try {
        waitingForDone = item.fn // TODO: Improve this!
            .toString() // Get function declaration
            .match(/\([a-zA-Z,\ ]+\)/)[0] // Match parameters
            .replace(/\(|\)/g, '') // Clean parameters
            .split(',').length === item.maxArgs
    } catch (e) {
        waitingForDone = false
    }
    return waitingForDone
}
process.on('exit', function () {
    if (queue.length > 0) {
        console.error('Premature exit detected for suite: ' + current + '.')
        console.error('Make sure to call `done()` at the end of an async suite')
        exitCode = 1
    }
    process.exit(exitCode || 0)
})
var ok = function (expression, label, extra) {
    okCounter++
    if (typeof label === 'undefined') {
        label = `#${okCounter}`
    }
    if (expression === false) {
        exitCode = 1
        console.error(`NOT OK: ${label}`)
        if (typeof extra !== 'undefined') {
            if (typeof extra === 'function') {
                extra()
            } else {
                console.log(extra)
            }
        }
    }
}
var runNext = function (shiftQueue) {
    if (shiftQueue !== false) {
        queue.shift()
    }
    if (queue.length > 0) {
        var item = queue[0]
        if (typeof item.fn === 'function') {
            if (typeof item.label !== 'undefined') {
                console.log(`Running test suite: ${item.label}`)
                current = item.label
            }
            if (item.maxArgs === 2) {
                item.fn(ok, runNext)
            } else {
                item.fn(runNext)
            }
            if (isAsync(item) === false) {
                runNext()
            }
        } else {
            console.warn('unexpected condition')
        }
    }
}
var addToQueue = function (fn) {
    if (queue.length === 0) {
        setTimeout(function () {
            runNext(false)
        }, 10)
    }
    queue.push(fn)
}
var __beforeEach = function () {}
var __afterEach = function () {}
var beforeEach = function (fn) {
    __beforeEach = fn
}
var afterEach = function (fn) {
    __afterEach = fn
}
var test = function (label, fn) {
    if (typeof label === 'function') {
        fn = label
        label = `(untitled suite #${++suiteCounter})`
    }
    addToQueue({
        fn: __beforeEach,
        maxArgs: 1,
        label: label
    })
    addToQueue({
        fn: fn,
        maxArgs: 2
    })
    addToQueue({
        fn: __afterEach,
        maxArgs: 1
    })
}
module.exports = {
    test: test,
    ok: ok,
    beforeEach: beforeEach,
    afterEach: afterEach
}
