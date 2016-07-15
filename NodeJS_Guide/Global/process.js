
//不使用process.nextTick
function doSomething(callback) {
	somethingComplicated();
	callback();
}

doSomething(function onEnd() {
	compute();
});


function somethingComplicated() {
	for(var i = 0;i<5000000000;i++){
		;
	}
	console.log("somethingComplicated");
}


function compute() {
	for(var i = 0;i<5000000000;i++){
		;
	}
	console.log("compute");
}

//使用process.nextTick
// function doSomething(callback) {
// 	somethingComplicated();
// 	process.nextTick(callback);
// }

// doSomething(function onEnd() {
// 	compute();
// });


// function somethingComplicated() {
// 	for(var i = 0;i<5000000000;i++){
// 		;
// 	}
// 	console.log("somethingComplicated");
// }


// function compute() {
// 	for(var i = 0;i<5000000000;i++){
// 		;
// 	}
// 	console.log("compute");
// }