/**
 * Created by Administrator on 2016/4/27.
 *
 * express的配置文件,用于导出一个服务器实例.
 */
/**
 * 安装express和body-parser(从淘宝的服务器)
 * npm install express --save --registry=http://registry.npm.taobao.org
 * npm install body-parser --save --registry=http://registry.npm.taobao.org
 */
var express = require("express");
var bodyParser = require("body-parser");//用于解析POST数据的中间件.

//此处导出一个函数，当导入时此函数会被调用。相当于导出函数执行后的返回值。
module.exports = function(){
    console.log("init express!!!");
    var app = express();//得到express的实例.
    app.use(bodyParser.json());//使用bodyparse的json()方法。

    //定义请求响应的函数.
    app.use(function(req,res,netx){
        res.status(400);//返回状态400.

        //为了防止重复响应返回要进行try catch.
        try{
            return res.json("资源不存在.");
        }catch (e){
            console.error("400 set handler after send.");
        }

    });

    //用于统一处理各种错误的函数。
    app.use(function(err,req,res,netx){
        if(err!=null){
            return next();
        }
        res.status = 500;
        //为了防止重复响应返回要进行try catch.
        try{
            return res.json(err.message || "server error!!")//如果有err.message则返回，否则返回后面的内容。
        }catch(e) {
            console.error("500 set handler after send.");
        }
    });

    return app;
};
