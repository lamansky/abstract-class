'use strict'

const assert = require('assert')
const enforceAbstractClass = require('.')

describe('enforceAbstractClass()', function () {
  it('should throw an error when instantiating abstract class', function () {
    class Parent {
      constructor () {
        enforceAbstractClass(Parent, this)
      }
    }

    assert.throws(() => new Parent())
  })

  it('should throw an error if child class does not implement properties', function () {
    class Parent {
      constructor () {
        enforceAbstractClass(Parent, this, 'title', 'content')
      }
    }

    class Child extends Parent {
      get title () { return 'Title' }
    }

    assert.throws(() => new Child())
  })

  it('should not throw an error if child class implements required properties', function () {
    class Parent {
      constructor () {
        enforceAbstractClass(Parent, this, 'title', 'content')
      }
    }

    class Child extends Parent {
      get title () { return 'Title' }
      get content () { return 'Content' }
    }

    new Child() // eslint-disable-line no-new
  })

  it('should support the bind operator', function () {
    class Parent {
      constructor () {
        enforceAbstractClass.call(Parent, this)
      }
    }
    assert.throws(() => new Parent())

    class Child extends Parent {}
    new Child() // eslint-disable-line no-new
  })
})
