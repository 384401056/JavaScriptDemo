var http = require('http');
var util = require('util');
var url = require('url');

var num = 0;

//隐式
// var httpServer = http.createServer(function (req,res) {
// 	num++;
// 	console.log("已连接!"+num);
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	res.write('<h1>Node.js</h1>');
// 	res.end('<p>Hello World</p>');
// });

var httpServer = new http.Server();

//当收到请求时，监听到request事件。
httpServer.on("request",function(req,res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js</h1><p>Hello World</p>');
	//返回请求头headers
	// res.end(util.inspect(req.headers));
	console.log(util.inspect(url.parse(req.url,true)));
	//返回url,并且用url模块进行解析。通过 url.parse①，原始的 path 被解析为一个对象，其中 query 就是我们所谓的 GET请求的内容，而路径则是 pathname。
	res.end(util.inspect(url.parse(req.url,true)));
})

httpServer.listen(3000);

console.log("HTTP server is listening at port 3000.");
