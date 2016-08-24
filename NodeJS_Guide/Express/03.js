/**
 * Created by Administrator on 2016/8/13.
 */
var express = require("express");

var app = express();

app.get("/",function(req,res,next){
    console.log("1");
    next(); //继续进行路由判断 。
});

app.get("/",function(req,res){
    console.log("2");
});

app.listen(3000,function(){
    console.log("Server is Listen on 3000.....");
});
