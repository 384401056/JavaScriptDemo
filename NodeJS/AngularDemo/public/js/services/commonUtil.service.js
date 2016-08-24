/**
 * 工具类
 * author : mhz
 * serviceName:commonUtil
*/
app.factory("commonUtil",['$http','$document','$cookieStore',function($http,$document,$cookieStore){
	return {
		//过滤表格选中集合
		getSelArray: function(array) {
			var selArray=[];
			angular.forEach(array, function(o) {
				if(o.$checked==true){
					selArray.push(o);
				}
			});
			return selArray;
		},
		//拼接id
		getSelIds: function(array) {
			var selIds='';
			if(array){
				for(var i=0;i<array.length;i++){
					if(selIds!=''){
						selIds+=',';
					}
					selIds+=array[i].id;
				}
			}
			return selIds;
		},
		//获取文档高度
		getWindowH:function(){
			return $(document).height();
		},
		//获取文档宽度
		getWindowW:function(){
			return $(window).width();
		},
		//判断是否为空对象
		isNullObj:function(obj){
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					return false;
				}
			}
			return true;
		},
		set:function(name, value){
			var cook = name+"="+value+";";
			if(!!arguments[2]){
				var d = new Date();
				d.setDate(d.getDate()+arguments[2]);
				cook = cook + "expires="+d.toUTCString()+";";
			}
			if(!!arguments[3]){
				cook = cook + "path="+arguments[3]+";";
			}
			if(!!arguments[4]){
				cook = cook + "domain="+arguments[4];
			}
			$document.cookie = cook;
		},
		get:function(name){
			var cookie = $document.cookie;
			var arr = cookie.split(";");
			for(var i=0;i<arr.length;i++){
				var info = arr[i];
				var arrInfo = info.split("=");
				if(arrInfo[0]==name){
					return arrInfo[1];
				}
			}
			return "";
		},
		remove:function(name){
			var info = this.get(name);
			var date = new Date();
			date.setDate(date.getDate()-1);
			var cook = name + "=" + info+";expires="+date.toUTCString()+";";
			if(!!arguments[1]){
				cook = cook + "path="+arguments[1]+";";
			}
			if(!!arguments[2]){
				cook = cook + "domain="+arguments[2]+";";
			}
			$document.cookie = cook;
		},
		//设置表单可编辑
		formWritable:function(formId){
			$("#"+formId+" input").removeAttr("disabled");
			$("#"+formId+" select").removeAttr("disabled");
			$("#"+formId+" radio").removeAttr("disabled");
			$("#"+formId+" checkbox").removeAttr("disabled");
		},
		//设置表单不可编辑
		formReadOnly:function(formId){
			$("#"+formId+" input").attr("disabled",true);
			$("#"+formId+" input").css('backgroundColor', '#FFF').css('cursor','default');
			$("#"+formId+" select").attr("disabled",true);
			$("#"+formId+" select").css('backgroundColor', '#FFF').css('cursor','default');
			//$("#"+formId+" radio").attr("disabled",true);
			$("#"+formId+" checkbox").attr("disabled",true);
		},
		getToken: function () {
			var token =  $cookieStore.get("token");
			return token;
		}
	};
}]);
