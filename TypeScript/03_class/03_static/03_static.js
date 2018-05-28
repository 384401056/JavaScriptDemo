var Person = /** @class */ (function () {
    function Person(age) {
        Person.age = age;
    }
    Person.prototype.tall = function () {
        return alert(Person.age);
    };
    return Person;
}());
var p1 = new Person(10000);
p1.tall();
