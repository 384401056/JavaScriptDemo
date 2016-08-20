/**
 * Created by Administrator on 2016/8/13.
 */
var express = require("express");

var app = express();

//use可以进行文件夹层级的匹配，也就是只要以“/”开头的路由就匹配成功。
//如果匹配路径为"/",可以直接省略不写。
app.use("/use",function(req,res,next){
    console.log(new Date()+"");
    next();
});

app.get("/admin",function(req,res){
    res.send("admin");
});

//当执行以此条时，说明以上的路由都不匹配。直接给出404
app.use(function(req,res){
   res.send("404");
});

app.listen(3000,function(){
    console.log("listen on 3000!");
});