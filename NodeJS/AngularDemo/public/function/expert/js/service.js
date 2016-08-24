//咨询服务
app.service('ConsultService', ['$http','$q',function($http,$q){
	

	var url = ACP_EXPERT_SERVER;

		return {

			getDefaultUrl:function() {
				return url;
			}

			

		}
}]);
//智能诊断服务
app.service('DiagnoseService', ['$http','$q',function($http,$q){

	var url = ACP_EXPERT_SERVER;

	return {

		getDefaultUrl: function () {
			return url;
		}

	}
}]);

//农技辅导服务
app.service('TechnologyService', ['$http','$q',function($http,$q){

	var url = ACP_EXPERT_SERVER;

	return {

		getDefaultUrl: function () {
			return url;
		}
	}
}]);

//农技辅导服务
app.service('SearchExpertService', ['$http','$q',function($http,$q){

	var url = ACP_EXPERT_SERVER + "consult";

	return {

		getDefaultUrl: function () {
			return url;
		},

		getIndustryCategory: function() {
			
			var deferred = $q.defer();

			$http({
				url: url + "/getIndustryCategory" ,
				method: "GET"
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;

		},

		getIndustryCategoryById: function(idValue) {
			
			var deferred = $q.defer();

			$http({
				url: url + "/getIndustryCategory/"+ idValue ,
				method: "GET"
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;

		},

		getCropsById: function(idValue) {
			var deferred = $q.defer();

			$http({
				url: url + "/getCrops/"+ idValue ,
				method: "GET"
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;
		}
	}
}]);

//公共动画服务
app.service('AnimateService', ['$http','$q',function($http,$q){

	var url = ACP_EXPERT_SERVER;


	/**
	 * 左边界面控制
	 */
	var left = {
		onExpand : function() {
			$('.left-panel').css('margin-right', 400);
		},

		onContract : function() {
			$('.left-panel').css('margin-right', 0 + 15);
		}
	}

	/**
	 * 菜单控制
	 */
	var menu = {
		dropdown: function(nowObj) {
			nowObj.children('.menu-dropdown').show();
		},
		dropup: function(nowObj) {
			nowObj.children('.menu-dropdown').hide();
		}
	}


	return {

		getDefaultUrl: function () {
			return url;
		},

		flow: function() {
			$('.right-panel').on('click', function() {

				if( !$(this).hasClass('contract')){
					var widthValue= $(this).width() + 400;

					$(this).stop().animate({
						width : widthValue + "px"
					});

					left.onContract();

					$(this).addClass('contract');
				}else {
					var widthValue= $(this).width() - 400;

					$(this).stop().animate({
						width : widthValue + "px"
					});

					left.onExpand();

					$(this).removeClass('contract');
				}



				

			});

		},

		menu: function(scope, funName) {

			$('.menu .top-menu-item').on('mouseenter', function() {

				if(funName != "" || funName != null) {
					var idValue = $(this).attr("itemId")

					var fun = funName + "("+ idValue +", 1)";
					
					scope.$eval(fun);
				}
				
				menu.dropdown($(this));
			});

			$('.menu .top-menu-item').on('mouseleave', function() {
				menu.dropup($(this));
			});

		},

		menuLeftInit: function(scope, funName, parentId) {
			/*二级子菜单*/

			$('.menu .menu-left').each(function() {
				if($(this).attr("parentId") == parentId) {
					$(this).children("li.left-menu-item").on('mouseenter', function() {
						if(funName != "" || funName != null) {
							var idValue = $(this).attr("itemId")

							var fun = funName + "("+ idValue +", 2)";
						
							scope.$eval(fun);
							
						}
					});
				}
			});

		},

		winResize: function() {
			$(window).bind('resize', function() {
				
				if($(document).width() <= 1425) {
					$('.right-panel').trigger('click');
				}

			});
		}


	}
}]);


