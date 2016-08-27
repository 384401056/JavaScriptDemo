/**
 *
 * Created by Administrator on 2016/8/26.
 */

var express = require("express");
var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');//调试助手.
var url = 'mongodb://localhost:27017/itcast';
var app = express();

//静态服务
app.use(express.static(__dirname+"/public"));

app.get("/",function (req, res) {
    res.sendFile("index.html");
});


app.get("/insert",function (req, res) {
    MongoClient.connect(url, function(err, db) {
        // assert.equal(null, err);
        console.log("连接数据库成功！！");
        insertDocuments(db,function (result) {
            res.send();
            db.close();
        });
    });
});

app.get("/remove",function (req, res) {
    MongoClient.connect(url, function(err, db) {
        // assert.equal(null, err);
        console.log("连接数据库成功！！");
        removeDocument(db,function (result) {
            res.send();
            db.close();
        });
    });
});


app.get("/update",function (req, res) {
    MongoClient.connect(url, function(err, db) {

        console.log("连接数据库成功！！");
        updateDocument(db,function (result) {
            res.send();
            db.close();
        });
    });
});


app.get("/find",function (req, res) {
    MongoClient.connect(url, function(err, db) {
        // assert.equal(null, err);
        console.log("连接数据库成功！！");
        findDocuments(db,function (docs) {
            res.send(docs);
            db.close();
        });
    });
});



app.listen(3000,function () {
    console.log("Listen on 3000!")
});


/**
 * 插入数据
 * @param db
 * @param callback
 */
var insertDocuments = function(db, callback) {
    var collection = db.collection('student');
    collection.insertMany([
        {"name":"小明","age":32,"hobby":["泡妞","磕药"],"score":{"yuwen":59,"shuxue":56}},
        {"name":"小李","age":22,"hobby":["磕药","吃饭"],"score":{"yuwen":29,"shuxue":34}},
        {"name":"小张","age":42,"hobby":["睡觉","吃饭"],"score":{"yuwen":39,"shuxue":73}},
        {"name":"小赵","age":52,"hobby":["睡觉","磕药"],"score":{"yuwen":79,"shuxue":33}},
    ], function(err, result) {
        console.log("插入3条记录。");
        callback(result);
    });
};

/**
 * 删除数据
 * @param db
 * @param callback
 */
var removeDocument = function(db, callback) {
    var collection = db.collection('student');
    collection.deleteOne({ "name": "小赵" }, function(err, result) {
        console.log("删除数据成功!");
        callback(result);
    });
};


/**
 * 修改数据
 * @param db
 * @param callback
 */
var updateDocument = function(db, callback) {
    var collection = db.collection('student');
    collection.updateOne({"name":"小明"}
        , { $set: {"age":100} }, function(err, result) {
            console.log("数据修改成功！");
            callback(result);
        });
}


/**
 * 查询集合中的数据
 * @param db
 * @param callback
 */
var findDocuments = function(db, callback) {
    var collection = db.collection('student');
    collection.find({}).toArray(function(err, docs) {
        console.log(docs)
        callback(docs);
    });
};

