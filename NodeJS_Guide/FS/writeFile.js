var fs = require("fs");

//===============异步执行================
// var data = "这是写入的文字."
// fs.writeFile('./res/kkk.txt', data, function(err) {
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("定入文件成功！");
// 		}
// });


// var data = "这是这是追加的文字.......\r\n"
// var data = new Buffer("这是这是追加的文字.......\r\n");
// var options = {
// 	flag : 'a',
// 	encoding:'utf8'
// }

// fs.writeFile('./res/kkk.txt', data , options ,function(err) {
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("定入文件成功！");
// 		}
// });

//=================用base64编码的读取和写入，实现图片的复制.(同步方式实现)=====================

// var options = {
// 	encoding : 'base64'
// }

// try{
// 	var data = fs.readFileSync('./res/sky.jpg', options);
// 	fs.writeFileSync('./res/sky02.jpg', data, options);
// 	console.log("复制图片文件成功！");
// }catch(ex){
// 	console.log(ex);
// }

//=================用base64编码的读取和写入，实现图片的复制.(异步方式实现)=====================
var options = {
	encoding : 'base64'
}

fs.readFile('./res/sky.jpg', options, function(err,data) {
	if(err){
		console.log(err);
	}else{
		fs.writeFile('./res/kkk.jpg', data, options, function(err) {
			if(err){
				console.log(err);
			}else{
				console.log("复制图片文件成功！");
			}
		});
	}
	console.log("正在复制......");
});
console.log("正在读取文件......");