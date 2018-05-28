//ts的类
var Student = /** @class */ (function () {
    //构造方法
    function Student(firstName, middleName, lastName) {
        this.fullName = firstName + '=' + middleName + '=' + lastName;
    }
    return Student;
}());
var stu = new Student('Gao', 'Yan', 'Bin');
console.log(stu.fullName);
// document.body.innerHTML = stu.fullName;
/** geter seter */
var Person = /** @class */ (function () {
    function Person(name, age) {
        this._name = name;
        this._age = age;
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (n) {
            this._name = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (a) {
            this._age = a;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var p1 = new Person("gaoyanbin", 200);
console.log(p1.name);
console.log(p1.age);
