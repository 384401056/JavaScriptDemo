/**
 * Created by Administrator on 2016/8/28.
 */
var Student = require("../models/Student");

exports.showIndex = function(req, res) {
    res.sendFile("index.html");
};

exports.create = function(req, res) {
    var json = {
        "name":req.query.name,
        "age":req.query.age,
        "sex":req.query.sex
    };
    console.log(json);
    Student.create(json, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        Student.findByJson({}, function (err, result) {
            if (err) {
                console.log(err);
                return;
            };
            res.json(result);
        });
    });
};

exports.find = function(req, res) {
    Student.findByJson({}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        res.json(result);
    });
};
