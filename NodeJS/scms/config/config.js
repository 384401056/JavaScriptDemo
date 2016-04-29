/**
 * Created by Administrator on 2016/4/27.
 */

var config = null;

//如果环境变量存在，并且NODE_ENV存在,就读取此配置文件,否则就读取开发环境配置文件development.js
if(process && process.env && process.env.NODE_ENV){
    config = require("./env"+process.env.NODE_ENV+".js");
}else{
    config = require("./env/development")
}

//将config导出,这样就能在其它文件中通过 require("./env/config.js")导入配置了.
module.exports = config;