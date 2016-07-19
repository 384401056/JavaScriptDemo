/**
 * Created by Administrator on 2016/5/2.
 */
var express = require("express");
var bodyParser = require("body-parser")

var app = express();

//app.use拦截所有请求。
//如果拦截到的请求是以POST提交的，并且content-type是json格式，则请求内容就用bosyParser.json()来处理。
app.use(bodyParser.json());

//如果拦截到的请求是以POST提交的，并且content-type是urlencode的格式，则请求内容就用bodyParser.urlencoded()来处理。
app.use(bodyParser.urlencoded({
  extended:false
}));

//express.static()方法指定了一个用于存放静态文件的路径。
//当一个静态文件的请求到达时，如果有与请求文件路径匹配的文件，则直接返回
app.use(express.static(__dirname+"/public"));

//app.get拦截'/'根目录的请求。
// app.get("/",function(req,res,next){
  // res.send("Hello World");
// });


app.use("/",require("./routes/index.js"));

app.listen(8080,function(){
  console.log("Server is Listen on 8080.....");
});
