/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var app = express();
var router = require("./controller");//引入一个路由.

//静态服务。当访问静态文件时要加上static.
app.use(express.static(__dirname+"/public"));

app.get("/admin",router.showIndex());

//app.get("/",router.showIndex);

app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
