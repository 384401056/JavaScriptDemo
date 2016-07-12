var fs = require("fs");

//=====================打开文件并读取数据,异步执行==========================
// fs.open('./res/kkk.txt', 'r', function (err,fd) {
// 	if(err) console.log(err);
// 	else{
// 		console.log("打开成功.."+fd);

// 		var Mybuffer = new Buffer(1024);
// 		fs.read(fd, Mybuffer, 0, 18, 0, function(err,bytesRead,buffer) {
// 			if(err) console.log(err);
// 			else{
// 				console.log("读取成功");
// 				console.log("读取长度:"+bytesRead);
// 				console.log("读取内容:"+buffer.slice(0,bytesRead).toString());//截取从0到时bytesRead的字节数。
// 				console.log("操作完成!");
// 			}
// 		});
// 	}
// });

//=====================打开文件并读取数据,同步执行==========================
// try{
// 	var fd = fs.openSync('./res/kkk.txt', 'r');
// 	console.log("读取成功");
// 	var Mybuffer = new Buffer(1024);
// 	var bytesRead = fs.readSync(fd, Mybuffer, 0, 18, 0);//返回读取的长度.
// 	console.log("读取长度:"+bytesRead);
// 	console.log("读取内容:"+Mybuffer.slice(0,bytesRead).toString());
// }catch(ex){
// 	console.log(ex);
// }

// console.log("操作完成!");


//=====================打开文件并写入数据,异步执行==========================

var myBuf = new Buffer("我是李小龙!!!!!!\r\n");

fs.open('./res/kkk.txt', 'r', function (err,fd) {
	if(err) console.log(err);
	else{
		fs.write(fd, myBuf, 0, 24, 0, function (err,bytesWrite,buf) {
			if(err) console.log(err);
			else{
				console.log("写入成功!!");
			}
		});


	}
}






