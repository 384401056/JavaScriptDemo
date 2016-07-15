var util = require('util');

function Person() {
	this.name = 'byvoid';
	this.toString = function() {
		return this.name;
	};
}

var person = new Person();

var opt = {
	showHidden:true,//是一个可选参数，如果值为 true，将会输出更多隐藏信息.
	depth:null,//表示最大递归的层数，默认会递归2层.
	colors:false //值为 true，输出格式将会以 ANSI 颜色编码.
}

//inspect是一个将任意对象转换为字符串的方法.
console.log(util.inspect(person, opt));