/**
 * Created by Administrator on 2016/8/20.
 */
var file = require("../models/file.js");

exports.showIndex = function(req,res){
    res.sendFile("index.html");
};

exports.getAllFiles = function(req,res){
    var result = [];
    file.getAllFiles("./upload",function(err,files){
        if(err){
            console.log(err)
        }else {
            result = files;
            res.json(result);//返回json数据.
        }
    });
};

exports.showAlbum = function (req, res) {
    var fileName = req.query["name"];
    var result = [];
    file.getAllFiles("./upload/"+fileName,function(err,files){
        if(err){
            console.log(err)
        }else {
            result = files;
            res.json(result);//返回json数据.
        }
    });
};
