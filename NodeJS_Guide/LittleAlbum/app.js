/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var app = express();
var router = require("./controller");//引入一个路由.

//静态服务。当访问静态文件时要加上static.
app.use("/static",express.static(__dirname+"/public"));


app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
