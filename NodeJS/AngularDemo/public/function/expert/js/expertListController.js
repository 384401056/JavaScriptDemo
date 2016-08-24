/**
 * 专家列表页controller
 * @return none
 */
(function() {
	app.controller("ExpertList",['$scope','$stateParams','ExpertService','$state','$cookieStore',ExpertList]);
	function ExpertList($scope, $stateParams, ExpertService, $state, $cookieStore) {
    var el = $scope;
    el.currentSkill = $stateParams.skilledField || 0;
    el.pageInfo = {
      currentPage:1,
      pageSize:5
      // totalRecord:10,
    };
    var promise = ExpertService.getSearchTypes('skilledField');
    promise.then(function(data) {
      if(data.flag == 1){
        el.skilledField = data.data;
      }
    });
    getExpertInfos();
    function getExpertInfos() {
      var promise = ExpertService.getPagedExpertInfo(el.currentSkill==0?'':el.currentSkill,el.pageInfo.currentPage,el.pageInfo.pageSize);
      promise.then(function(data) {
        if(data.flag == 1) {
          el.expertList = data.data;
          console.log(el.expertList);
          el.pageInfo.totalRecord = data.data.totalCount;
        }
      });
    }
		//初始化导航
  	// if($scope.getNavSize() === 0) {
  	// 	var navItem = {
  	// 		href:'app.report',
  	// 		text:'专家列表',
  	// 	}
  	// 	$scope.addNavItem(navItem);
  	// };

  

  el.chooseDomain = chooseDomain;
  el.selectPage = selectPage;
  el.reloadData = reloadData;
  el.jumpToPage = jumpToPage;
  el.gotoExpertInfo = gotoExpertInfo;
  el.gotoAppointment = gotoAppointment;
  function gotoAppointment(id, name) {
    var navItem = {
        href: 'app.expertAppointment',
        text: "预约专家",
        userId:$cookieStore.get('id'),
        username:$cookieStore.get('name'),
      }
      $scope.addNavItem(navItem);
      $state.go(navItem.href,{'userid':id,'username':name});
  };
  /**
   * 选择专家所属领域
   * @param  {[type]} $event [description]
   * @return {[type]}        [description]
   */
  function chooseDomain(dictcode, $event) {
    el.currentSkill = dictcode;
    el.pageInfo.currentPage = 1;
    getExpertInfos();
  };
  function selectPage(pageindex) {
    console.log(pageindex);
    el.pageInfo.currentPage = pageindex;
    getExpertInfos();
  };
  function reloadData(){
    getExpertInfos();
  };
  function jumpToPage(){

  };
  function gotoExpertInfo(id) {
    $state.go('app.viewExpertIntroduction',{idValue:id});
  }


	}
})();