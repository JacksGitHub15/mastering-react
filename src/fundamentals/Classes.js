// Classes are very poppular in OOP languages including JavaScript
// JS allows functinal programming and OOP to exist side-by-side. 

// Example of a class:

// class definition
class Developer {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
    }
}

// Each class has a constructor that takes arguments and assigns them to the class instance.
// A class can also define functions that are associated with a subject called methods or class methods.
// Defining the Developer class once is just part one, instantiating it is next. The class definition 
// is the blueprint of its capabilities, and usage occurs when an instance is created with the new statement


// class instantiation
const robin = new Developer('Robin', 'Wieruch');
console.log(robin.getName());
// "Robin Wieruch"
// another class instantiation
const dennis = new Developer('Dennis', 'Wieruch');
console.log(dennis.getName());
// "Dennis Wieruch"

// Similar to JavaScript, React allows one to create multiple instances of a class/component,
// but only allows for one component definition