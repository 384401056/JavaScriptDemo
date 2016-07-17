var http = require('http');
var url = require('url');;
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function(req,res) {
	
	var userUrl = req.url;
	console.log(userUrl);

});

server.listen(3000,'localhost');
console.log("server listen on 3000.");