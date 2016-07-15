//events 模块只提供了一个对象： events.EventEmitter
//大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

//注册监听error事件。
event.on("error",function (errStr) {
	console.error(errStr);
})

//EventEmitter 定义了一个特殊的事件 error，它包含了“错误”的语义，我们在遇到异常的时候通常会发射 error 事件。
event.emit("error","发生XXXX错误了!!!!!!");