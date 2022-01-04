// DOCS: https://nodejs.org/api/events.html

/**
 * EventEmitter
 * ✅ on
 * ✅ once
 * ✅ emit
 * ✅ off
 * ✅ removeAllListeners
 */
class EventEmitter {
    events = {};

    on(eventName, listener) {
        if (!this._isValid(listener)) {
            throw new Error('listener must be a function');
        }

        const listeners = (this.events[eventName] =
            this.events[eventName] || []);

        const wrappedListener =
            typeof listener === 'object' ? listener : { listener, once: false };

        if (this._indexOf(listener, listeners) === -1) {
            listeners.push(wrappedListener);
        }
    }

    once(eventName, listener) {
        this.on(eventName, {
            listener,
            once: true,
        });
    }

    emit(eventName, ...args) {
        const listeners = this.events[eventName];

        if (!listeners || listeners.length === 0) {
            throw new Error(`No listeners on this event: ${eventName}`);
        }

        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener.listener.apply(this, args);

            if (listener.once) {
                this.off(eventName, listener.listener);
            }
        }
    }

    off(eventName, listener) {
        const listeners = this.events[eventName];
        const index = this._indexOf(listener, listeners);

        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    removeAllListeners(eventName) {
        if (eventName && this.events[eventName]) {
            this.events[eventName] = [];
        }
    }

    _isValid(listener) {
        if (typeof listener === 'function') {
            return true;
        } else if (listener && typeof listener === 'object') {
            return this._isValid(listener.listener);
        } else {
            return false;
        }
    }

    _indexOf(listener, listeners) {
        let index = -1;
        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i] && listeners[i].listener === listener) {
                index = i;
                break;
            }
        }
        return index;
    }
}

// --------------Test--------------
const emitter = new EventEmitter();

function sayHello(name) {
    console.log(`Hello, ${name}`);
}

function sayBye(name) {
    console.log(`Bye, ${name}`);
}

function saySomethingBad(name) {
    console.log(`WTF, ${name}`);
}

console.log('---------on and emit');
emitter.on('greeting', sayHello);
emitter.on('greeting', sayHello);
emitter.on('greeting', sayBye);
emitter.emit('greeting', 'Luke');

console.log('---------once');
emitter.once('greeting', saySomethingBad);
emitter.emit('greeting', 'Luke');
emitter.emit('greeting', 'Luke');

console.log('---------off');

emitter.off('greeting', sayHello);
emitter.emit('greeting', 'Luke');

console.log('---------removeAllListeners');
emitter.removeAllListeners('greeting');
emitter.emit('greeting', 'Luke');
