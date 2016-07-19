var express = require("express");
var router = express.Router();




//Express 支持同一路径绑定多个路由响应函数.
router.all('/user/:username', function(req, res, next) {
	console.log('all methods captured');
	next();
});

router.get('/user/:username', function(req, res) {
	res.send('user: ' + req.params.username);
});


/* GET home page. */
router.get("/",function(req,res){
    res.send("Hello NodeJS!")
});

router.get("/hello",function(req,res){
    res.send('The time is ' + new Date().toString());
});

//返回状态码。
router.get("/fb",function(req,res){
    res.status(403).send("^_^ FB can't get!!")
});






module.exports = router;