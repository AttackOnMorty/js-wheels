// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
Function.prototype._bind = function (obj, ...args1) {
    const fn = this;

    const boundFn = function (...args2) {
        fn.apply(this instanceof boundFn ? this : obj, [...args1, args2]);
    };

    if (fn.prototype) {
        Object.setPrototypeOf(boundFn, fn.prototype);
    }

    return boundFn;
};

// --------------Test--------------
function sayHello(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

sayHello.prototype.foo = function () {
    console.log('foo');
};

const obj = {
    name: 'Luke',
};

const boundSayHello = sayHello._bind(obj, 'Hello');
boundSayHello();
new boundSayHello();
