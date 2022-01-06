// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

// toString + split
function flat(arr) {
    return arr.toString().split(',');
}

// concat + recursion
function flat(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flat(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }

    return result;
}

// ✅ Reduce + recursion
function flat(arr) {
    return arr.reduce(
        (prev, curr) => prev.concat(Array.isArray(curr) ? flat(curr) : curr),
        []
    );
}

// some + spread + concat
function flat(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

// ES6 flat
function flat(arr) {
    return arr.flat(Infinity);
}

// --------------Test--------------
const arr = [1, [2, [3, 4, 5]]];
console.log(flat(arr));
