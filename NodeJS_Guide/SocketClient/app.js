/**
 * Created by Administrator on 2016/8/19.
 */
console.log('Hello NodeJS!')
var net = require('net');
var client = net.connect({host: '10.88.31.214',port: 8888},
    function() {
        client.write('客户端连接成功!\n');
    });
client.on('data', function(data) {
    console.log(data.toString());
});
client.on('end', function() {
    console.log('已断开连接');
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        client.write(chunk);
        if(chunk == 'exit'){
            client.end();
            process.abort();
        }
    }
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});