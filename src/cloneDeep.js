/**
 * Basic Version
 * ❌ Symbol
 * ❌ Reference types like: Array, Function, Date, RegExp, Error...
 * ❌ Non-enumerable properties
 * ❌ Loop
 */
function cloneDeep(obj) {
    const result = {};

    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = cloneDeep(obj[key]);
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}

// --------------Test--------------
const obj = {
    null: null,
    undefined: undefined,
    boolean: true,
    string: 'abc',
    number: 1,
    bigInt: 1n,
    // NOTE: Can't handle types below
    symbol: Symbol(),
    object: { a: 1 },
    array: [1, 2, 3],
    function: function foo() {},
    date: new Date(),
    regExp: new RegExp(),
    error: new Error('error'),
};
console.log(obj);
console.log(cloneDeep(obj));

// TODO: Advanced Version
