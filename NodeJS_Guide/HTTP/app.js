var http = require('http');

var num = 0;

var httpServer = http.createServer(function (req,res) {
	num++;
	console.log("已连接!"+num);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js</h1>');
	res.end('<p>Hello World</p>');
});

httpServer.listen(3000);

console.log("HTTP server is listening at port 3000.");
