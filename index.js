'use strict'

const flatten = require('@lamansky/flatten')
const supportBindOperator = require('sbo')

module.exports = supportBindOperator(function AbstractClass (cls, obj, ...props) {
  if (obj.constructor === cls) {
    const parentClass = cls.name ? ' `' + cls.name + '`' : ''
    throw new Error('Cannot instantiate abstract class' + parentClass)
  }

  for (const propName of flatten(props)) {
    if (!(propName in obj)) {
      const childClass = obj.constructor && obj.constructor.name ? '`' + obj.constructor.name + '`' : 'The child class'
      throw new Error(childClass + ' must define the abstract property `' + propName + '`')
    }
  }
})
