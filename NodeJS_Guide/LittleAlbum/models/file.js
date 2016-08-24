/**
 *
 * Created by Administrator on 2016/8/22.
 */
var fs = require("fs");

/**
 * 获取目录下所有文件
 * @param callback
 */
exports.getAllFiles = function(path,callback){
    /**
     * 获取文件夹中的所有文件。
     */
    var albums = [];
    fs.readdir(path,function(err,files) {
        if (err) {
            callback(err, null);
        } else {
            //同步获取文件夹
            // for (var i = 0; i < files.length;i++) {
            //     var stats =fs.statSync("./upload/"+ files[i]);
            //     if(stats.isDirectory()) {
            //        albums.push(files[i]);
            //        console.log(albums);
            //     }
            // }
            // callback(null,albums);

            //异步获取文件夹
            (function iterator(i){
                if(i==files.length){
                    callback(null,albums);
                    return;
                }
                fs.stat(path+"/" + files[i], function (err, stats) {
                    if (stats.isDirectory()) {
                        albums.push(files[i]);
                    }
                    iterator(i+1);
                });
            }(0));

        }
    });
}

//exports.getDrictor = function(){
//  fs.readdir("./upload",function(err,files){
//     if(err){
//         console.log(err);
//     }else{
//         return files;
//     }
//  });
//};