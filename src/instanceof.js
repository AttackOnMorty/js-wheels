// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
function _instanceof(obj, constructor) {
    if (typeof obj !== 'object' || obj === null) return false;

    let proto = Object.getPrototypeOf(obj);

    while (proto) {
        if (proto === constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }

    return false;
}

// --------------Test--------------
console.log(_instanceof(1, Number));
console.log(_instanceof(null, Number));
console.log(_instanceof({ a: 1 }, Object));
