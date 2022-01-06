// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
Function.prototype._call = function (obj, ...args) {
    const fnName = Symbol();
    obj[fnName] = this;
    const result = obj[fnName](...args);
    delete obj[fnName];
    return result;
};

// --------------Test--------------
function sayHello(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

const obj = {
    name: 'Luke',
};

sayHello._call(obj, 'Hello');
