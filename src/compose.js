let compose;

// v1
compose = (...fns) =>
    fns.reduce(
        (fn1, fn2) =>
            (...args) =>
                fn1(fn2(...args))
    );

// v2
compose =
    (...fns) =>
    (x) =>
        fns.reduceRight((v, f) => f(v), x);

// --------------Test--------------
const getName = (person) => person.name;
const uppercase = (string) => string.toUpperCase();
const get6Characters = (string) => string.substring(0, 6);
const reverse = (string) => string.split('').reverse().join('');

const res = compose(
    reverse,
    get6Characters,
    uppercase,
    getName
)({ name: 'Buckethead' });
console.log(res);
