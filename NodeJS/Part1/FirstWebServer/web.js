/**
 * Created by Administrator on 2016/4/23.
 */
var http = require("http");

var requestHandler = function(req,res){
    res.end("This is My First NodeJS Webserver!!!");
}

var webServer = http.createServer(requestHandler);

webServer.listen(18000);

console.log("http running on http://localhost:18000");
