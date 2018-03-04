/**
 * Created by Administrator on 2016/8/20.
 */
var express = require("express");
var router = require("./controller");//引入一个路由.
var bodyParser = require("body-parser");

var app = express();

//如果拦截到的请求是以POST提交的，并且content-type是urlencode的格式，则请求内容就用bodyParser.urlencoded()来处理。
app.use(bodyParser.json({
    extended:false
}));

app.get("/",router.showIndex);

app.get("/hb",router.heartbeat);

app.get("/insert",router.insertGet);

app.post("/insert",router.insertPost);

app.listen(3000,function(){
    console.log("Listen on 3000!!!");
});
