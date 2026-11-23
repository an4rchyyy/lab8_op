'use strict';

const contract = (fn, ...types) => (...args) => {
  const argTypes = types.slice(0, -1);
  const resType = types[types.length - 1];
  for (let i = 0; i < args.length; i++) {
    const def = argTypes[i];
    if (def && typeof args[i] !== def.name.toLowerCase()) {
      throw new TypeError(`Invalid argument ${i}`);
    }
  }
  const res = fn(...args);
  if (resType && typeof res !== resType.name.toLowerCase()) {
    throw new TypeError('Invalid result type');
  }
  return res;
};

module.exports = { contract };