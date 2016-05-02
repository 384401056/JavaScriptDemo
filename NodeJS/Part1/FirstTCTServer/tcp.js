/**
 * Created by Administrator on 2016/4/23.
 */
var net = require("net");//使用核心模块net。

const PORT = 18000;
const HOST = "127.0.0.1";

/**
 * 当客户端连接到服务器上时的事件处理方法。
 * @param socket 客户端的socket
 */
function serverHandler(socket){
    console.log("someone connected server!");
    //当收到客户端数据时的事件处理
    socket.on("data",function(data){
        console.log(socket.remoteAddress,socket.remotePort,"send:",data.toString());
    });

    //当客户端断开连接的事件处理.
    socket.on("close",function(){
        console.log("a client lost connection!!");
    })

};


var tctServer = net.createServer(serverHandler)

tctServer.listen(PORT,HOST);//监听

console.log("tcp server running on tcp://",HOST,":",PORT);