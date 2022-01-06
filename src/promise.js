// Reference: https://www.promisejs.org/implementing/

// Basic Version
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

let _handlers = [];

function _Promise(executor) {
    this._state = PENDING;
    this._value = null;

    const fulfill = (value) => {
        if (this._state === PENDING) {
            this._state = FULFILLED;
            this._value = value;

            _handlers.forEach(({ onFulfilled }) => {
                const res = onFulfilled(this._value);
                if (res) this._value = res;
            });
            _handlers = null;
        }
    };

    const reject = (reason) => {
        if (this._state === PENDING) {
            this._state = REJECTED;
            this._value = reason;

            _handlers.forEach(({ onRejected }) => onRejected(this._value));
            _handlers = null;
        }
    };

    const resolve = (result) => {
        // A promise must never be fulfilled with another promise
        if (
            (typeof result === 'object' || typeof result === 'function') &&
            result !== null &&
            typeof result.then === 'function'
        ) {
            result.then(resolve, reject);
        }
        fulfill(result);
    };

    executor(resolve, reject);
}

_Promise.prototype.then = function (onFulfilled, onRejected) {
    return new _Promise((resolve, reject) => {
        if (this._state === FULFILLED) {
            return resolve(onFulfilled(this._value));
        }

        if (this._state === REJECTED) {
            return resolve(onRejected(this._value));
        }

        if (this._state === PENDING) {
            _handlers.push({
                onFulfilled,
                onRejected,
            });
        }
    });
};

// --------------Test--------------
const promise = new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 300);
});

promise
    .then(
        (value) => {
            const res = value + ' and bar';
            console.log(res);
            return res;
        },
        (error) => {
            console.log('error', error);
        }
    )
    .then(
        (value) => {
            const res = value + ' and bar again';
            console.log(res);
        },
        (error) => {
            console.log('error', error);
        }
    );
