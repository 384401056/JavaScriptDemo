var http = require('http');
var util = require('util');
var querystring = require('querystring');

var httpServer = new http.Server();
var post = '';

//当收到请求时，监听到request事件。
httpServer.on("request",function(req,res) {
	
	//当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，表示接收到的数据。
	//通过 req 的 data 事件监听函数，每当接受到请求体的数据，就累加到 post 变量中。
	req.on('data',function(chunk) {
		post += chunk;
	});
	//在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后向客户端返回。
	req.on('end',function() {
		post = querystring.parse(post);
		console.log("Server:"+util.inspect(post));
		res.end(util.inspect(post));
	});
});

httpServer.listen(3000);
console.log("HTTP server is listening at port 3000.");