var http = require('http');

var opt = {
	host:'localhost',
	port:'3000',
	path:'/user?name=Gaoyanbin&email=384401056@qq.com'
}

//自动将请求方法设为了 GET 请求，同时不需要手动调用 req.end()。
http.get(opt,function(res) {
	res.setEncoding('utf8');
	res.on('data',function(data) {
		console.log(data);
	})
});