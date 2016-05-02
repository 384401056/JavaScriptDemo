/**
 * Created by Administrator on 2016/5/2.
 */
var express = require("express");
var app = express();
app.listen(8080,function(req,res,next){
    res.send("Hello Express!");
});