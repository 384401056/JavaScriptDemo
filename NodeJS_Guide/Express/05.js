/**
 * Created by Administrator on 2016/8/13.
 */
var express = require("express");
var bodyParser = require('body-parser');

var app = express();

//引入中间件.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/public"));

//app.get("/",function(req,res){
//   console.log(req.query);//打印出get请求参数.
//    res.send();
//});

app.post("/post",function(req,res){
    console.log(req.body);
    res.send();
});

app.listen(3000,function(){
    console.log("listen on 3000!");
});