/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");

var app = express();

app.get("/",function(req,res){
    console.log(req.ip);//打印过程访问者的IP。
    console.log(req.fresh);//是否第一次访问
    console.log(req.hostname);//访问者主机名（IP）
    res.send();
});

app.listen(3000,function(){
    console.log("Listen on 3000!");
});