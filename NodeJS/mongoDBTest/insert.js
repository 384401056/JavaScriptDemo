/**
 * Created by Administrator on 2016/4/29.
 *
 * insert数据
 */

var mongoose = require("mongoose");
require("./model.js");//引入model文档中的内容。

//创建Book类。
var Book = mongoose.model("Book");

var book = new Book({
    name:"MEAN Web Development",
    author:"Gred",
    publishTime:new Date()
});

var book2 = new Book({
    name:"Hello My World",
    author:"King",
    publishTime:new Date()
});

var book3 = new Book({
    name:"I'm King!",
    author:"Quen",
    publishTime:new Date()
});

//保存
book.save(function(err){
    console.log("save status:",err?"failed":"success");
});

book2.save(function(err){
    console.log("save status:",err?"failed":"success");
});

book3.save(function(err){
    console.log("save status:",err?"failed":"success");
});