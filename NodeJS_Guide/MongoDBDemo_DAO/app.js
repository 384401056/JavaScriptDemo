/**
 *
 * Created by Administrator on 2016/8/26.
 */

var express = require("express");
var db = require("./models/db.js");
var app = express();

//静态服务
app.use(express.static(__dirname+"/public"));

app.get("/",function (req, res) {
    res.sendFile("index.html");
});


app.get("/insert",function (req, res) {
    var jsonData = {"name":"gaoyanbin","age":30};
    db.insertOne("student",jsonData,function (err, result) {
        if(err){
            console.log(err);
            return;
        }
        res.send(result)
    })
});


app.get("/find",function (req, res) {
   db.find("student",{},function (err,docs) {
       if(err){
           console.log(err);
           return;
       }
       res.json(docs);
   })
});

app.get("/findbypage",function (req, res) {
    var currentPage = parseInt(req.query.page);//当前第几页。
    var pageCount = 3;//每页多少条。
    db.findByPage("student",{},{"pageCount":pageCount,"currentPage":currentPage},function (err,docs) {
        if(err){
            console.log(err);
            return;
        }
        res.json(docs);
    });
});


app.get("/delete",function (req, res) {
   db.delete("student",{"score.shuxue":56},function (err,result) {
       if(err){
           console.log(err);
           return;
       }
       res.send(result);
   })     
});

app.get("/update",function (req, res) {
    db.update("student",{"name":"小张"},{$set:{"score.shuxue":88888}},function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        res.send(result);
    })
});


app.listen(3000,function () {
    console.log("Listen on 3000!")
});

