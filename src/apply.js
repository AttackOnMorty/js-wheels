// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
Function.prototype._apply = function (obj, args) {
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

sayHello._apply(obj, ['Hello']);
