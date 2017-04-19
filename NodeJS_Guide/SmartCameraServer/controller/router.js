/**
 * Created by Administrator on 2016/8/20.
 */
var db = require("../models/db.js");

exports.showIndex = function(req,res){
    res.send("Hello");
};

exports.heartbeat = function(req,res){
    console.log("=====HB====="+new Date());
    res.json(1);
};

exports.insertGet = function(req,res){
    var jsonData = {
        "ip":req.query.ip,
        "num":req.query.num,
        "date":req.query.date
    };
    db.insertOne("testData",jsonData,function (err, result) {
        if(err){
            console.log(err);
            res.json(0);
        }
        res.json(1);
    })
};

exports.insertPost = function(req,res){
    var jsonData = {
        "ip":req.body.ip,
        "msg":req.body.msg,
        "date":req.body.date
    };
    db.insertOne("testData",jsonData,function (err, result) {
        if(err){
            console.log(err);
            res.json(0);
        }
        console.log(result.toString());
        res.json(1);
    });
    //console.log(req.query);
    //res.json(1);
};
