/**
 * Created by Administrator on 2016/4/29.
 */

var mongoose = require("mongoose");
//完整的mongodb连接地址。
//var url = 'mongodb://username:password@hostname:port/databasename';

var url = "mongodb://localhost/myDB";//只用hostname和databasename,省略了其它的内容。

mongoose.connect(url);//连接数据库.

//通过schema，创建模型model
var BookSchema = new mongoose.Schema({
    name:String,
    author:String,
    publishTime:Date
});
mongoose.model("Book",BookSchema);







