/**
 * Created by Administrator on 2016/4/23.
 */
var express = require("express");//express模块
var morgan = require("morgan");//日志模块

var app = express();//express模块
app.use(morgan());//日志模块

//使用express中间件express.static,指定静态文件的目录。
//app.use(express.static('./publice'));

//===============设置路由方法一 path方法 .get为请求方法===============
app.get("/",function(req,res){
    res.end("<H1>Hello ,This is a Express WebServer!!!</H1>")
})

//========================设置路由方法二======================
var Router = express.Router();
/*
 * http://localhost:18000/post/add
 * http://localhost:18000/post/list
 */

Router.get("/add",function(req,res){
    res.end("Router /add")
});

Router.get("/list",function(req,res){
    res.end("Router /list")
});

app.use("/post",Router);//将定义的路由加入到app中。


//==============设置路由的方法三=======================
app.route("/article")
    .get(function(req,res){
        res.end("reute /article get")
    })
    .post(function(req,res){
        res.end("reute /article post")
    })

//=============为路由指定路由参数=======================
//首先定义参数.其中回调函数的第三个参数是指，执行下一步操作，第四个参数就是参数的值.
app.param("userId",function(req,res,next,userId){
    req.userId = userId;//将参数添加到req中。
    next();
});

app.get("/user/:userId",function(req,res){
   res.end("UserId:"+req.userId);//从req中取出参数。
});


var afterListener = function(){
    console.log("Express running on http://localhost:18000");
}

//开启服务。
app.listen(18000,afterListener());





















