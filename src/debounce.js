function debounce(func, ms = 0) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), ms);
    };
}

// --------------Test--------------
function sayHello() {
    console.log(`Hello, ${this.name}`);
}

const obj = {
    name: 'Luke',
    sayHello: debounce(sayHello, 500),
};

setTimeout(() => obj.sayHello(), 0);
setTimeout(() => obj.sayHello(), 200);
setTimeout(() => obj.sayHello(), 500);
setTimeout(() => obj.sayHello(), 1050);
