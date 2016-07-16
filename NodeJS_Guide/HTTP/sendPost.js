var http = require('http');
var querystring = require('querystring');

//POST请求的内容.
var contents = querystring.stringify({
	name: 'Gaoyanbin',
	email: '384401056@qq.com',
	address: 'Zijing 2#, Tsinghua University',
});

var opt = {
	host:'localhost',
	port:'3000',
	path:'/',
	method: 'POST'
}

//用回调函数隐式绑定了response事件
// var req = http.request(opt,function(res) {
// 	res.setEncoding('utf8');
// 	//当接收到服务器的返回值时。
// 	res.on('data', function (data) {
// 		console.log("Client:"+data);
// 	});
// });

//显示绑定response事件。
var req = http.request(opt);

req.on('response',function(res) {
	res.setEncoding('utf8');
	//当接收到服务器的返回值时。
	res.on('data', function (data) {
		console.log("Client:"+data);
	});
})
//设置请求超时的时间和处理函数。
// req.setTimeout(timeout, [callback]);
req.write(contents);
req.end();//不要忘了通过 req.end() 结束请求，否则服务器将不会收到信息。