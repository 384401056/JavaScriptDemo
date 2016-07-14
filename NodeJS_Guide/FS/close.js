var fs = require('fs');

var myBuf = new Buffer("我是张学友\r\n");
try{
	//openSync中的mode,定义为wx时，表示以排它方式写入。
	var fd = fs.openSync('./res/kkk.txt', 'a');
	var bytesWrite = fs.writeSync(fd, myBuf, 0, 17, null);
	console.log("写入成功!!");
	//同步磁盘缓存。
	fs.fsync(fd,function  (err) {
		if(err){
			console.log(err);
		}else{
			fs.close(fd, function (err) {
				if(err){
					console.log(err);
				}else{
					console.log("关闭文件");
				}
			});
		}
	})
}catch(ex){
	console.log(ex);
}