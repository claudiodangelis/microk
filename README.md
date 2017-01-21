# microk

**microk** is a zero-dependency testing library for NodeJS.

**microk** won't produce any output unless an assertion is false. If an assertion fails the **exit code** of the program is 1.

### Installation

Installation using **npm** or **yarn**:

`npm install --save-dev microk`

or

`yarn add --dev microk`

### Walkthrough

#### Do quick assertions

This code does not produce any output, the assertion is true so it silently
goes on:

```javascript
const { ok } = require('microk')

let value = 1
ok(value === 1)
```

Let's introduce an error:

```javascript
const { ok } = require('microk')
let value = 2
ok(value === 1)
console.log('end')
```

The code above will print an error, yet it won't stop the execution. The output is:

```
NOT OK: #1
end
```

What happened here is that the first `ok` assertion was not true.

---

To help you reading the output you can add a label to the `ok` assertions:

```javascript
let value = 1
ok(value === 2, 'value is correct')
ok(1 === 2)
```

The output:

```
NOT OK: value is correct
NOT OK: #2
```

`ok` assertions also support an `extra` parameter. If this parameter a function, it will be **invoked**,
otherwise it will be printed. **Note:** the `extra` argument will only be used
if the assertion fails.

```javascript
let value = 1
ok(value === 2, 'value is correct', value)
```

or

```javascript
ok(value === 2, 'value is correct', () => {
    console.log('actual value is', value)
})
```



### Credits

**microk** share its origin with another vanilla js testing project: [tressa](https://github.com/WebReflection/tressa) by [Andrea Giammarchi (WebReflection)](https://twitter.com/webreflection).

Read more about Andrea's idea: [JS Vanilla Test Code Coverage](https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121), [Vanilla JS Testing — Part II](https://medium.com/@WebReflection/vanilla-js-testing-part-ii-63b9d736121).
