/**
 * Created by Administrator on 2016/8/28.
 */
var mongoose = require('mongoose');
var db = require("./db.js");

//创建了一个schema结构。
var studentSchema = new mongoose.Schema({
    name     :  {type : String},
    age      :  {type : Number},
    sex      :  {type : String}
});

//创建静态方法
studentSchema.statics.findByJson = function(json, callback) {
    return this.model('Student').find(json, callback);
};
//创建修改的静态方法
studentSchema.statics.update = function(conditions,update,options,callback){
    return this.model("Student").update(conditions, update, options, callback);
}

// studentSchema.statics.createStudent = function (studentJson, callback) {
//   return studentModel.create(studentJson,callback);
// };

//实例方法
studentSchema.methods.findByName = function(name,callback) {
    // return this.model('Student').find({"name": name}, callback);
};

//创建了一个模型，就是学生模型，就是学生类。
//类是基于schema创建的。
var studentModel = db.model('Student', studentSchema);

module.exports = studentModel;

