let exitCode = 0,
    labelCounter = 0,
    queue = []

let isAsync = (item) => {
    let waitingForDone
    try {
        waitingForDone = item.fn                // TODO: Improve this!
            .toString()                         // Get function declaration
            .match(/\([a-zA-Z,\ ]+\)/)[0]       // Match parameters
            .replace(/\(|\)/g, '')              // Clean parameters
            .split(',').length === item.maxArgs
    } catch (e) {
        waitingForDone = false
    }
    return waitingForDone
}

let runNext = (shiftQueue) => {
    if (shiftQueue !== false) {
        queue.shift()
    }
    if (queue.length > 0) {
        let item = queue[0]
        if (typeof item.fn === 'function') {
            if (typeof item.label !== 'undefined') {
                console.log(`Running test suite: ${item.label}`)
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

let addToQueue = (fn) => {
    if (queue.length === 0) {
        setTimeout(() => {
            runNext(false)
        }, 10)
    }
    queue.push(fn)
}
let __beforeEach = () => {}
let __afterEach = () => {}

export let beforeEach = (fn) => {
    __beforeEach = fn
}

export let afterEach = (fn) => {
    __afterEach = fn
}

export let ok = function () {
    if (process.listeners('exit').length === 1) {
        // Register new listener
        process.on('exit', () => {
            process.exit(exitCode)
        })
    }
    try {
        console.assert.apply(null, arguments)
    } catch (e) {
        exitCode = 1
        console.log(`NOT OK: ${e.message}`)
    }
}

export let test = (label, fn) => {
    if (typeof label === 'function') {
        fn = label
        label = `(untitled suite #${++labelCounter})`
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
