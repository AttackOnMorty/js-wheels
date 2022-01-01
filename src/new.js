// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
function _new(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw Error('constructor must be a function');
    }

    const obj = {};
    Object.setPrototypeOf(obj, constructor.prototype);
    const result = constructor.apply(obj, args);

    const isObject = typeof result === 'object' && result !== null;
    const isFunction = typeof result === 'function';
    return isObject || isFunction ? result : obj;
}

// --------------Test--------------
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}

const person = _new(Person, 'Luke', 'Male');
console.log(person);
