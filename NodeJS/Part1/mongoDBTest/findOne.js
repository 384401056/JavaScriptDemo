/**
 * Created by Administrator on 2016/4/29.
 *
 * 查找唯一的数据
 */

var mongoose = require("mongoose");
require("./model.js");

//创建Book类。
var Book = mongoose.model("Book");

Book.findOne({"author":"Gred"},function(err,doc){
    if(err){
        console.log("err:",err);
        return;
    }
    doc.author = "Gaoyanbin";//修改作者值。
    doc.save();//保存到数据库
    console.log("findOne result:",doc.toString());

});