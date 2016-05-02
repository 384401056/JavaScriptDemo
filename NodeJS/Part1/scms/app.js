/**
 * Created by Administrator on 2016/4/27.
 */

var expressConf = require("./config/express");//导入express配置文件。

var app = expressConf();//获取express实例。

module.exports = app;//导出app