/**
 * Created by Administrator on 2016/8/20.
 */
var file = require("../models/file.js");

exports.showIndex = function(req,res){
    res.sendFile("index.html");
};

exports.getAllFiles = function(req,res){
    var result = [];
    file.getAllFiles(function(err,files){
        if(err){
            console.log(err)
        }else {
            result = files;
            res.json(result);//返回json数据.
        }
    });
};
