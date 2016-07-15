
//把文件夹封装为一个包.
// var somePackage = require('./package');
// somePackage.hello();

//把文件夹封装为一个包.使用package.json文件来定义。
var somePackage = require('./packageJson');
somePackage.hello();