/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var app = express();
var router = require("./controller");//引入一个路由.

//静态服务
app.use(express.static(__dirname+"/public"));

app.get("/",router.showIndex);
app.get("/getFile",router.getAllFiles);
app.get("/getFileParams",router.showAlbum);
app.use(function(req,res){
    res.sendFile(__dirname+"/public/err.html");
});

app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
