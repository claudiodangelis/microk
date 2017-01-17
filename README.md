# microk

1. No dependencies
2. It can automagically determine if it's testing synchronous or asynchronous code, user must remember to pass the `done` parameter to a test suite if they want the test to run asynchronously

Example:

Synch test suite:

```
test('my suite', (ok) => {
    ok(1 === 1, 'hello')
})
```

Asynchronous test suite:

```
test('my async suite', (ok, done) => {
    setTimeout(() => {
        ok(false !== false, 'this will raise an error')
        done()
    })
})
```

The microk library will take care of chaining suites together, suites will run one after the other no matter if they are synchronous or asynchronous.

Things you can import:

- `test`: defines a test suite
- `ok`: runs a single assertion. It is passed by default as the first parameter of the `test` callback
- `beforeEach`: a function that runs before each suite
- `afterEach`: a function that runs after each suite
