/**
 * Created by Administrator on 2016/8/28.
 */
var mongoose = require('mongoose');
//创建数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/itcast');
//监听open事件
db.on('error',console.error.bind(console,'数据库连接错误!!!'));
db.once('open', function () {
    console.log("数据库已连接.....");
});

module.exports = db;

