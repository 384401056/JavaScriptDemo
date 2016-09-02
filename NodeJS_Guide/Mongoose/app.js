/**
 * Created by Administrator on 2016/8/28.
 */
var express = require("express");
var router = require("./controller/router");
var app = express();

app.use(express.static(__dirname+"/views"));

app.get("/",router.showIndex);
app.get("/find",router.find);
app.get("/create",router.create);

//404
app.use(function(req,res){
    res.sendFile(__dirname+"/views/err.html");
});

app.listen(3000,function () {
    console.log("Listen on 3000!");
});

