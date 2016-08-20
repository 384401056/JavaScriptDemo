/**
 * Created by Administrator on 2016/8/13.
 */
var expresss = require("express");

var app = new expresss();

app.get("/",function(req,res){
   res.send("Hello!");
});

//以冒号的形式来表示参数,是express中的语法.
app.get("/student/:xiehao",function(req,res){
   res.send("学号:"+req.params["xiehao"]);
});

app.get('/user/:id', function(req, res){
   res.send('用户ID: ' + req.params.id);
});

app.listen(3000);