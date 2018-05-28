function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var userName = { firstName: "Gao", lastName: "Yanbin", age: 200 }; //只有有符合interface的值就可以，多的不会有问题。
console.log(greeter(userName));
var aa = { a1: 'AAAAA', a2: 2342314 };
function printText(text) {
    console.log(text.a1);
    console.log(text.a2);
}
printText(aa);
var point = { x: 100, y: 200 };
function readonlyFunc(obj) {
    console.log(obj.x);
    console.log(obj.y);
}
readonlyFunc(point);
var myFunc = function (s, sub) {
    var result = s.search(sub);
    if (result !== -1) {
        return true;
    }
    else {
        return false;
    }
};
console.log(myFunc("gaoyaobin", 'k'));
var array = ["Lily", "Jims"];
// let array:ArrayType = ["Lily",10000]; //报错
console.log(array);
var Clock = /** @class */ (function () {
    function Clock() {
    }
    //实现接口的方法
    Clock.prototype.setTime = function (date) {
        this.currentTime = date;
    };
    Clock.prototype.getTime = function () {
        return this.currentTime;
    };
    return Clock;
}());
var s = {}; //有接口生成对象
s.sideLenght = 20;
s.penWidth = 50;
s.color = "#FFF000";
console.log(s);
var c;
console.log(c(10));
console.log(c.reset());
