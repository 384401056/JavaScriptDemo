/**
 * 
 * Created by Administrator on 2016/8/26.
 */
var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings");

function _connection(callback) {
    var url = settings.dbUrl;//配置文件中的数据库地址.
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log(err)
            return;
        }
        callback(err,db);
    });
};

/**
 * 插入数据
 * @param collectionName 集合名称
 * @param json 数据
 * @param callback 回调
 */
exports.insertOne = function (collectionName,json,callback) {
    if(arguments.length !== 3){
        callback("insertOne必须有3个参数.",null);
        return;
    }
  _connection(function (err,db) {
      db.collection(collectionName).insertOne(json,function (err,result) {
          if(err){
              console.log(err);
              db.close();
              return;
          }
          callback(err,result);
          db.close();
      })
  })  
};

/**
 * 查看所有数据
 * @param collectionName 集合名称
 * @param callback 回调
 */
exports.find = function (collectionName,json,callback) {
    if(arguments.length !== 3){
        callback("insertOne必须有2个参数.",null);
        return;
    }
    _connection(function (err,db) {
        db.collection(collectionName).find(json).toArray(function (err,docs) {
            if(err){
                console.log(err);
                db.close();
                return;
            }
            callback(err,docs);
            db.close();
        });

    })
};

/**
 * 分页查询
 * @param collectionName 集合名
 * @param json 查询条件
 * @param pageInfo 分页信息
 * @param callback
 */
exports.findByPage = function (collectionName,json,pageInfo,callback) {
    if(arguments.length !== 4){
        callback("insertOne必须有4个参数.",null);
        return;
    }
    var pageCount = pageInfo.pageCount;
    var currentPage = pageInfo.currentPage;
    
    _connection(function (err,db) {
        //获取集合的总数.
        db.collection(collectionName).find(json).count(function (err,count) {
            if(err){
                console.log(err);
                db.close();
                return;
            }
            var recordCount = parseInt(count);
            var countPages = Math.ceil(recordCount/pageCount);//总页数(向上取整)
            //如果用户输入的当前页大于总页数，则赋值为总页数-1。
            if(pageInfo.currentPage<countPages){
                currentPage = pageInfo.currentPage;
            }else{
                currentPage = countPages-1;
            }

            //查询集合并设置分页
            db.collection(collectionName).find(json).limit(pageCount).skip(pageCount*currentPage).toArray(function (err,docs) {
                if(err){
                    console.log(err);
                    db.close();
                    return;
                }
                callback(err,docs);
                db.close();
            });
        });
    })
};


/**
 * 删除数据
 * @param collectionName 集合名
 * @param json 删除条件
 * @param callback
 */
exports.delete = function (collectionName,json,callback) {
    if(arguments.length !== 3){
        callback("insertOne必须有3个参数.",null);
        return;
    }
    _connection(function (err,db) {
        db.collection(collectionName).deleteMany(json,function (err,result) {
            if(err){
                console.log(err);
                db.close();
                return;
            }
            callback(err,result);
            db.close();
        })
    })
};

/**
 * 更新数据
 * @param collectionName  集合名
 * @param json1 查询条件
 * @param json2 更新的内容
 * @param callback
 */
exports.update = function (collectionName,json1,json2,callback) {
    _connection(function (err,db) {
        db.collection(collectionName).updateMany(json1, json2, function (err, result) {
            if (err) {
                console.log(err);
                db.close();
                return;
            }
            callback(err, result);
            db.close();
        })
    });
};





