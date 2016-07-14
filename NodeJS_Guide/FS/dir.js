var fs = require("fs");

//=====================创建目录.================
// fs.mkdir('./lib', function (err) {
// 	if(err) console.log(err);
//  else{
// 		console.log("创建目录成功！");
// 	}
// });

//==================读取目录,异步========================
// fs.readdir('./res', function (err,files) {
// 	if(err) console.log(err);
// 	else{
// 		//files为目录下的文件名数组。
// 		console.log(files);
// 	}
// });

//===================查看文件或目录信息==================
fs.stat('./res/kkk.txt', function (err,stats) {
	if(err) console.log(err);
	else{
		console.log(stats);
	}
});