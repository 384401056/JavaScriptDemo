/**
 * Created by Administrator on 2016/4/27.
 *
 * 程序的入口文件
 */

var app = require("../app.js");//导入实例.
var config = require("../config/config.js");//导入配置文件。

//开启服务，监听端口
app.listen(config.port,function(){
    console.log("App running,listen on:",config.port);
});
