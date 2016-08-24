/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var app = express();
var router = require("./controller");//引入一个路由.

//静态服务
app.use(express.static(__dirname+"/public"));

app.get("/getFile",router.getAllFiles);

app.get("/",router.showIndex);

app.use(function(req,res){
    res.sendFile(__dirname+"/public/404.html")
});

app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
