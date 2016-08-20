/**
 * Created by Administrator on 2016/8/20.
 */
exports.showIndex = function(req,res){
    res.sendFile("index.html");
};


exports.showAdmin = function(req,res){
    res.sendFile("admin.html");
};