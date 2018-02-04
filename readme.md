# abstract-class

Prevents instantiation of a parent class. Optionally defines properties that must be implemented by child classes. Imitates the functionality provided by abstract classes in languages like Java, PHP, and C++.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i abstract-class
```

## API

The module exports a single function. This function should be called in the constructor of the class you want to declare abstract.

### Parameters

1. Bindable: `cls` (Function): The abstract parent class.
2. `obj` (Object): The `this` variable of your object being constructed.
3. Optional: `...props` (any number of: string, number, symbol, or Array thereof): The keys of the properties that a child class should implement.

### Return Value

The function does not return a value.

## Example

```javascript
const enforceAbstractClass = require('abstract-class')

class Parent {
  constructor () {
    enforceAbstractClass(Parent, this, 'title', 'content')
  }
}

class Child extends Parent {
  get title () { return 'Title' }
}

// Throws Error: Cannot instantiate abstract class `Parent`
const parent = new Parent()

// Throws Error: `Child` must define the abstract property `content`
const child = new Child()
```

Constructing a `Parent` object fails because the class is marked abstract. Constructing a `Child` object also fails because `Child` does not define `content`.

You can also use the bind operator pattern:

```javascript
const Abstract = require('abstract-class')

class Parent {
  constructor () {
    Parent::Abstract(this)
  }
}

// Throws Error: Cannot instantiate abstract class `Parent`
const parent = new Parent()
```

## Limitation

If the child class provides its own constructor and fails to call the parent constructor, property abstraction will not be enforced.
