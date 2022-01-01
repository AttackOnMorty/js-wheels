function debounce(func, ms = 0) {
    let timeoutId;
    return function (...args) {
        console.log('---clear timeout');
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

obj.sayHello();
obj.sayHello();
