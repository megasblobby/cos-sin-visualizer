"use strict";

function validateNullUndifined(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      for (let index = 0; index < args.length; index++) {
        if (args[index] === null || typeof args[index] === 'undefined') {
          let error = new
          TypeError(`Argument #${index + 1} of function ${name} is: ${args[index]}`);

          console.error(`${name}: ${args}`);
          console.error(error);

          throw error;
        }
      }
      const result = original.apply(this, args);
      return result;
    }
  }
  return descriptor;
}

function validateEmptyString(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      for (let index = 0; index < args.length; index++) {
        if (args[index] === '') {
          let error = new
          TypeError(`Argument #${index + 1} of function ${name} is an empty string`);

          console.error(`${name}: ${args}`);
          console.error(error);

          throw error;
        }
      }
      const result = original.apply(this, args);
      return result;
    }
  }
  return descriptor;
}

export {validateNullUndifined, validateEmptyString};
