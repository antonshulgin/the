# the.js

A type checking library for Javascript.

## Installation and setup

```shell
$ npm install the.js
```

For Node.js:

```javascript
const the = require('./path/to/the.js');
```

For browser environments:

```html
<script src='./path/to/dist/the.min.js'></script>
<script>
	the(42).isNumber();
</script>
```

## Usage

```javascript
const the = require('./path/to/the.js');

let thing = 42;

console.log(the(thing).isNumber()); // true
console.log(the(thing).isString()); // false, outputs the explanation and stack trace to the console
console.log(the(thing).isString(true)); // still false, but no console output
```

## Methods

### .isNumber([isSilent]);

Checks if the value is a finite number.

```javascript
the(42).isNumber(); // true
the(1e0).isNumber(); // true
the(0xff).isNumber(); // true
the('42').isNumber(); // false
the(null).isNumber(); // false
the(NaN).isNumber(); // false
the(Infinity).isNumber(); // false
```

### .isDefined([isSilent]);

Checks if the value is not `undefined`.

```javascript
the(42).isDefined(); // true
the(null).isDefined(); // true
the('').isDefined(); // true
the({}).isDefined(); // true
the().isDefined(); // false
```

### .isNull([isSilent]);

Checks if the value is `null`.

```javascript
the(null).isNull(); // true
the(0).isNull(); // false
the().isNull(); // false
```

### .isString([isSilent]);

Checks if the value is a string.

```javascript
the('').isString(); // true
the('42').isString(); // true
the([]).isString(); // false
the({}).isString(); // false
```

### .isHexString([isSilent]);

Checks if the value is a hex string.

```javascript
the('000000').isHexString(); // true
the('abcdef').isHexString(); // true
the('42').isHexString(); // true
the(' 0 0 ').isHexString(); // false
the('ghijklmnopqrstuvwxyz').isHexString(); // false
the('').isHexString(); // false
```

### .isEmptyString([isSilent]);

Checks if the value is an empty string.

```javascript
the('').isEmptyString(); // true
the('42').isEmptyString(); // false
the([]).isEmptyString(); // false
the({}).isEmptyString(); // false
```

### .isBoolean([isSilent]);

Checks if the value is boolean.

```javascript
the(true).isBoolean(); // true
the(false).isBoolean(); // true
the(!0).isBoolean(); // true
the(new Boolean()).isBoolean(); // false
the(0).isBoolean(); // false
```

### .isFunction([isSilent]);

Checks if the value is a function.

```javascript
the(function () { return 42; }).isFunction(); // true
the(console.log).isFunction(); // true
the(isNaN).isFunction(); // true
the(new Function()).isFunction(); // true
the(null).isFunction(); // false

let Thing = function () {};
the(new Thing()).isFunction(); // false
```

### .isObject([isSilent]);

Checks if the value is an object literal.

```javascript
the({}).isObject(); // true
the(console).isObject(); // true

let Thing = function () {};
the(new Thing()).isObject(); // true

the(NaN).isObject(); // false
the(null).isObject(); // false
```

### .isArray([isSilent]);

Checks if the value is an array.

```javascript
the([]).isArray(); // true
the({}).isArray(); // false
the('').isArray(); // false

function fn(arg1, arg2) {
	return the(arguments).isArray(); // false
}
```

### .isDate([isSilent]);

Checks if the value is a date.

```javascript
the(new Date()).isDate(); // true
the(new Date(9000)).isDate(); // true
the(Date.parse('1980-01-01 00:00')).isDate(); // false

let timeDiff = (new Date('1970-01-01 00:10')) - (new Date('1970-01-01 00:05'));
the(timeDiff).isDate(); // false
```

### .isRegExp([isSilent]);

Checks if the value is a regular expression.

```javascript
the(/^.+$/ig).isRegExp(); // true
the(new RegExp('/^.+$/', 'ig')).isRegExp(); // true
the('/^.+$/').isRegExp(); // false
```

### .isInstanceOf(constructor[, isSilent]);

Checks if the value is an instance of a class (constructor).

```javascript
let num = new Number(42);
the(num).isInstanceOf(Number); // true

let Thing = function () {};
the(new Thing()).isInstanceOf(Thing); // true
the(new Thing()).isInstanceOf(Object); // false
the(new Thing()).isInstanceOf(Function); // false
the({}).isInstanceOf(Object); // true
the([]).isInstanceOf(Array); // true
the(function () {}).isInstanceOf(Function); // true
the(42).isInstanceOf(Number); // false
the('42').isInstanceOf(String); // false
```

### .hasPrototypeOf(constructor[, isSilent]);

Checks if the value has a prototype of a class (constructor).

```javascript
let num = new Number(42);
the(num).hasPrototypeOf(Number); // true
the(42).hasPrototypeOf(Number); // true
the(NaN).hasPrototypeOf(Number); // true
the(Infinity).hasPrototypeOf(Number); // true
the('42').hasPrototypeOf(String); // true
the(null).hasPrototypeOf(Number); // false

let Thing = function () {};
the(new Thing()).hasPrototypeOf(Thing); // true
the(new Thing()).hasPrototypeOf(Object); // false
the(new Thing()).hasPrototypeOf(Function); // false
```

### .isFrozen([isSilent]);

Checks if the value is [a frozen object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen).

```javascript
let object = { value: 42 };
let frozenObject = Object.freeze({ value: 42 });
the(frozenObject).isFrozen(); // true
the(object).isFrozen(); // false
```
