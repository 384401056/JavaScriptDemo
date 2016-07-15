//events 模块只提供了一个对象： events.EventEmitter
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

//为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数 listener。
event.on("some_event",function (arg1,arg2) {
	console.log('listener1', arg1, arg2);
})

event.on("some_event",function (arg1,arg2) {
	console.log('listener2', arg1, arg2);
})

//2秒后触发seom_event事件.
setTimeout(function () {
	//发射 event 事件，传递若干可选参数到事件监听器的参数表。
	event.emit("some_event","aaaa","kkkkk");
}, 2000);
