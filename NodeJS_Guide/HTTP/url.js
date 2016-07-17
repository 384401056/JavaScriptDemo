var http = require('http');
var url = require('url');;
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function(req,res) {
	if(req.url !== '/favicon.ico'){
		
		// console.log(util.inspect(url.parse(req.url)));

		var pathname = url.parse(req.url).pathname;
		//当parse方法，第二个参数是true时，代表解析为一个对象.
		var query = url.parse(req.url,true).query;
		var userName = query.userName;
		var pwd = query.pwd;
		var address = query.address;

		

		console.log("path:"+pathname);
		// console.log("query:"+query);
		console.log("port:"+port);
		console.log("userName:"+userName);
		console.log("pwd:"+pwd);
		console.log("address:"+address);
		res.end("success!");

	};
	
})

server.listen(3000,'localhost');
console.log("server listen on 3000.");