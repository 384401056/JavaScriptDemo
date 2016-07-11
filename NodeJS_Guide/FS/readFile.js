var fs = require("fs");

//====================异步执行========================
//----------不指定编码格式，并输出字符串。
// fs.readFile("./res/test.txt", function(err,data) {
// 	if(err) console.log("读取文件出错！");
// 	else{
// 		console.log(data.toString());
// 	}
// });

// fs.readFile("./res/test.txt","utf8",function(err,data) {
// 	if(err) console.log("读取文件出错！");
// 	else{
// 		console.log(data);
// 	}
// });
// console.log("123");//先打印123,再打印文件内容。


//====================同步执行========================
try{
 	var data = fs.readFileSync("./res/test.txt", "utf8");
	console.log(data);
}catch(ex){
	console.log("读取文件出错！"+ex);
}
console.log("123");//先打印文件内容，才打印123.
