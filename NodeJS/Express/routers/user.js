/**
 * Created by Administrator on 2016/5/2.
 */
var express = require("express");

var router = express.Router();

router.all("/list",function(req,res){
    console.log("method:",req.method);
    console.log("baseUrl:",req.baseUrl);
    console.log("path:",req.path);

    console.log("headers-user-agent:",req.headers['user-agent']);
    console.log("user-agent:",req.get('user-agent'));

    //GET请求时获取url参数
    console.log("query:",req.query);
    //console.log("query.id:",req.query.id);
    //console.log("query.name:",req.query.name);

    //POST请求时获取body参数。
    console.log("body:",req.body);
    res.send("Hello /user/list")
});

//REST风格传递参数. /user/list/1001
router.get("/rest/:id",function(req,res){
    console.log("query-param:",req.params);
    res.send("REST风格传递参数 OK");
});

//返回状态码。
router.get("/fb",function(req,res){
    res.status(403).send("^_^ FB can't get!!")
});

//返回文件
router.get("/file",function(req,res){
    res.contentType("image/jpeg");//指定文件类型
    res.sendfile("123.jpg",{root:__dirname+"/../public/img/"});//指定文件名和目录。
});

//返回json
router.get("/json",function(req,res){
    res.json({name:"gaoyanbin",age:"20",sex:"男"});
});


module.exports = router;












