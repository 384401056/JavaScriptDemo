/**
 * Created by Administrator on 2016/8/20.
 */

exports.showIndex = function(req,res){
    res.send("Hello");
};

exports.heartbeat = function(req,res){
    console.log("=====HB====="+new Date());
    res.json(1);
};
