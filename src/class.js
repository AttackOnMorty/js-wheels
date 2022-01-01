// --------------Class--------------
class Person {
    constructor(name) {
        this.name = name;
    }

    sayName = () => {
        console.log(`My name is ${this.name}`);
    };

    sayHello() {
        console.log(`Hello, I'm ${this.name}`);
    }
}

class Programmer extends Person {
    constructor(name, skills) {
        super(name);
        this.skills = skills;
    }

    sayHello() {
        super.sayHello();
        console.log(`I'm a programmer.`);
    }

    getSkills() {
        console.log('Skills:', this.skills);
    }
}

const luke = new Programmer('Luke', ['JS', 'React']);
luke.sayHello();
luke.getSkills();

// --------------Function--------------

// How extends works
function _extends(child, parent) {
    Object.setPrototypeOf(
        child.prototype,
        Object.create(parent.prototype, {
            constructor: {
                value: child,
                enumerable: false,
            },
        })
    );
}

const Person = (function () {
    function Person(name) {
        this.name = name;
        // How arrow function works
        this.getName = function () {
            console.log(`My name is ${this.name}`);
        };
    }

    Person.prototype.sayHello = function () {
        console.log(`Hello, I'm ${this.name}`);
    };

    return Person;
})();

const Programmer = (function (Person) {
    _extends(Programmer, Person);

    // How constructor works
    function Programmer(name, skills) {
        Person.call(this, name);
        this.skills = skills;
    }

    Programmer.prototype.sayHello = function () {
        // How super works
        Person.prototype.sayHello.call(this);
        console.log(`I'm a programmer.`);
    };

    Programmer.prototype.getSkills = function () {
        console.log('Skills:', this.skills);
    };

    return Programmer;
})(Person);

const luke = new Programmer('Luke', ['JS', 'React']);
luke.sayHello();
luke.getSkills();
