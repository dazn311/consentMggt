// function Brick() {
//     this.width = 10;
//     this.height = 20;
// }
//
// function BlueGlassBrick() {
//     Brick.call(this);
//
//     this.opacity = 0.5;
//     this.color = 'blue';
// }
//
// const blueClass = new BlueGlassBrick()
//
// console.log('blueClass', blueClass)

///////////////

function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.newValue = 5;
};

Person.prototype.greeting = function() {
    console.log('Hi! I\'m ' + this.name.first + ' '+ this.name.last + '.'+ ' '+ this.newValue + '.');
};

// const person = new Person('Alex', 'RG', 12, 'm','IBM')
// console.log('person', person)

function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests);

    this.subject = subject;
}
const teach = new Teacher('Alex', 'RG', 12, 'm','IBM','PC')

// Teacher.prototype = Object.create(Person.prototype);

// console.log('teach', teach)
// console.log('Person prototype', Person.prototype.greeting) // [Function (anonymous)]
// console.log('Teacher prototype greet', Teacher.prototype.greeting) // undefined
// console.log('Person prototype', Object.getOwnPropertyNames(Person.prototype))  //  [ 'constructor', 'greeting' ]
// console.log('Teacher prototype', Object.getOwnPropertyNames(Teacher.prototype))  // [ 'constructor' ]


Teacher.prototype = Object.create(Person.prototype)
// Teacher.prototype = Person.prototype // если получим ссылку, то полность переопределим.
Teacher.prototype.greeting = function() {
    var prefix;

    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
        prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
        prefix = 'Mrs.';
    } else {
        prefix = 'Mx.';
    }

    console.log('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};

const teach2 = new Teacher('Alex', 'RG', 12, 'm','IBM','PC')
const person1 = new Person('Alex', 'RG', 12, 'm','IBM')
// console.log('Teacher prototype greet', Teacher.prototype.greeting) // [Function (anonymous)]

teach2.newValue = 7
person1.greeting()
teach2.greeting()
console.log(teach2);
