function throttle(func, wait) {
    let inThrottle = false;
    let timeoutId;
    let lastTime;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastTime = Date.now();
            }, wait - (Date.now() - lastTime));
        }
    };
}

// --------------Test--------------
function sayHello() {
    console.log(`Hello, ${this.name}`);
}

const obj = {
    name: 'Luke',
    sayHello: throttle(sayHello, 500),
};

setTimeout(() => obj.sayHello(), 0);
setTimeout(() => obj.sayHello(), 100);
setTimeout(() => obj.sayHello(), 510);
setTimeout(() => obj.sayHello(), 610);
