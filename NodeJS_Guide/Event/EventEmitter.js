var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on("some_event",function () {
	console.log("some_event 事件触发了!!");
})

//2秒后触发seom_event事件.
setTimeout(function () {
	event.emit("some_event");//发射事件...
}, 2000);
