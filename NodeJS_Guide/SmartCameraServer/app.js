/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var app = express();
var router = require("./controller");//引入一个路由.

app.get("/",router.showIndex);

app.get("/hb",router.heartbeat);

app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
