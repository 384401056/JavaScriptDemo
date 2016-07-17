var fs = require('fs');

getMime(".json");

function getMime(extname) {
	fs.readFile('./mime.json', 'utf8', function(err,data) {
		if(err){
			console.log(err);
		}else{
			var typeData = JSON.parse(data);	
			console.log(typeData[extname]);
		}
	});
}
