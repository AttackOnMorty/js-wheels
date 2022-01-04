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

/**
 * Advanced Version
 * ✅ Symbol
 * ✅ Reference types like: Array, Function, Date, RegExp, Error...
 * ✅ Non-enumerable properties
 * ✅ Loop
 */
function cloneDeep(obj, cache = new WeakMap()) {
    if (obj.constructor === Date) {
        return new Date(obj);
    }

    if (obj.constructor === RegExp) {
        return new RegExp(obj);
    }

    if (cache.has(obj)) return cache.get(obj);

    const res = Object.create(
        Object.getPrototypeOf(obj),
        // NOTE: Copy non-enumerable properties
        Object.getOwnPropertyDescriptors(obj)
    );

    cache.set(obj, res);

    // NOTE: Reflect.ownKeys will return enumerable, non-enumerable, symbol properties
    for (const key of Reflect.ownKeys(obj)) {
        res[key] =
            isComplexDataType(obj[key]) && typeof obj[key] !== 'function'
                ? cloneDeep(obj[key], cache)
                : obj[key];
    }

    return res;
}

function isComplexDataType(obj) {
    return (
        (typeof obj === 'object' || typeof obj === 'function') && obj !== null
    );
}

// --------------Test--------------
const obj = {
    null: null,
    undefined: undefined,
    boolean: true,
    string: 'abc',
    number: 1,
    bigInt: 1n,
    // NOTE: Basic version can't handle types below
    symbol: Symbol(),
    object: { a: 1 },
    array: [1, 2, 3],
    function: function foo() {},
    date: new Date(),
    regExp: new RegExp(),
    error: new Error('error'),
};
Object.defineProperty(obj, 'innumerable', {
    value: 'innumerable',
    enumerable: false,
});

obj.loop = obj;

const clonedObj = cloneDeep(obj);
console.log(obj);
console.log(clonedObj);
