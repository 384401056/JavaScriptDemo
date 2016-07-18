var net = require('net');
var util = require('util');

var server = net.createServer(function (socket) {
	console.log("连接已经建立！");
});


server.on('error',function (err) {
	if(err.code === 'EADDRINUSE'){
		console.log("服务器地址");
	}
})


server.listen(8431,'localhost',function() {
	console.log("TCP服务器已启动!"+util.inspect(server.address()));
});