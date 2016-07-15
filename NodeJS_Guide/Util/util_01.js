var util = require("util");


//Base类.
function Base () {
	this.name = "Blucie";
	this.base = 1992;

	this.sayHello = function () {
		console.log('Hello '+ this.name);
	}
}

//原型定义的方法.
Base.prototype.showName = function () {
	console.log(this.name);
}



//Sub类
function Sub () {
	this.name = "Sub";
}

//实现对象间原型继承的函数。
util.inherits(Sub, Base);


var base = new Base();
base.sayHello();
base.showName();

var sub = new Sub();
//Sub 仅仅继承了 Base 在原型中定义的函数,内部定义的sayHello()方法没有被继承。
// sub.sayHello();
sub.showName();







