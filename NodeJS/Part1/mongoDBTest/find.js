/**
 * Created by Administrator on 2016/4/29.
 *
 * find文档数据
 */

var mongoose = require("mongoose");
require("./model.js");

//创建Book类。
var Book = mongoose.model("Book");

/**
 * 使用Book模型查寻文档数据.
 * err:是否出错。
 * docs:查找到的文档集合。
 */
Book.find({},function(err,docs){
    if(err){
        console.log("err:",err);
        return;
    }
    console.log("result:",docs.toString());
});