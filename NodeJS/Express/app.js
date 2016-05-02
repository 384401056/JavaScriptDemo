/**
 * Created by Administrator on 2016/5/2.
 */
var express = require("express");

var app = express();

app.get("/",function(req,res,next){
	res.send("Hello World");
})

app.listen(8080,function(){
	console.log("Server is Listen on 8080.....");
});
