/**
 * Created by Administrator on 2016/8/13.
 */
var express = require("express");

var app = express();

app.use(express.static(__dirname+"/public"));

app.listen(3000,function(){
    console.log("Server is Listen on3000.....");
});