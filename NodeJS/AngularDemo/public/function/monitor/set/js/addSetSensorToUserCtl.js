'use strict';

/* 添加推荐用户 */
/*
 author：hanwj
 */

app.controller('SetSensorToUserController', ['$scope', '$rootScope', '$modal', '$modalInstance', 'MonitorService','$http','toUsers','orgId','toaster',  function($scope, $rootScope, $modal, $modalInstance,MonitorService, $http,toUsers,orgId,toaster) {

    $scope.count=0;
    $scope.userMOrgData = [{}];
    $scope.userInfo=[];
    $scope.users=[];
   // var orgId=10003;
    getOrgUserList(orgId);
    $scope.cancel=function(){
       $modalInstance.close(-1);
    }

    //打开提示框
    $scope.toasterType={type: 'info', title: "提示信息", body:""};
    $scope.pop=function(){
        toaster.pop($scope.toasterType);
    }
    $scope.toasterType.type= 'warning';

    $scope.ok=function(){
        $scope.userInfo=[];
        $("input[name='userBox']").each(function(){
            if (this.checked ==true) {
                for(var i=0;i<$scope.users.length;i++){
                    if($(this).val()==$scope.users[i].id){//id 相等
                        $scope.userInfo.push($scope.users[i]);
                    }
                }
            }
        });
        $modalInstance.close($scope.userInfo);
    }
    $scope.sFalg=true;
    $scope.cFalg=false;

    $scope.checkAll=function(flag){
        if(flag==1){
            $scope.sFalg=false;
            $scope.cFalg=true;
            var checklist = document.getElementsByName ("userBox");
            for(var i=0;i<checklist.length;i++)
            {
                checklist[i].checked = 1;
                $scope.count=checklist.length;
            }
        }else{
            $scope.sFalg=true;
            $scope.cFalg=false;
            var checklist = document.getElementsByName ("userBox");
            for(var i=0;i<checklist.length;i++)
            {
                checklist[i].checked = 0;
                $scope.count=0;
            }
        }
    }
    //用户组织树Seeting
    $scope.setting = {
        view: {
                nameIsHTML: true,
                dblClickExpand: false,
                showTitle:false
        },
        data: {
             simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentorgid",
                    rootPid: null
                }
          },
            callback: {
                onNodeCreated: zTreeOnNodeCreated,
                onClick: onClick
            }
        };

    function zTreeOnNodeCreated(event, treeId, treeNode) {
        if(toUsers.length>0){
            for(var i=0;i<toUsers.length;i++){
                $("#user_"+toUsers[i]).prop("checked",true);
            }
            $scope.sFalg=false;
            $scope.cFalg=true;
            $scope.count=toUsers.length;
        }else{
            $scope.sFalg=true;
            $scope.cFalg=false;
        }
    };
    function onClick(e, treeId, treeNode) {
        var checklist = document.getElementsByName ("userBox");
        var num=0;
        for(var i=0;i<checklist.length;i++)
        {
            if( checklist[i].checked ==1){
                num++
            }
        }
        $scope.count=num;
     }

    function getOrgUserList(orgId){
            MonitorService.selectUserOrgsByUserID(orgId).then(function (data) {
                var preInfo0  = '<span ></span>';
                if (data["flag"]) {
                    $scope.orgUserData = data["data"];
                    if ($scope.orgUserData != null) {
                        $scope.orgData = [];
                        for(var i=0;i<$scope.orgUserData.length;i++){
                            var obj={"id":'-1',"name":''};
                            var data= $scope.orgUserData[i];
                            obj.id=data.userId;
                            obj.name=data.name;
                            if(i==0){
                                data.name = preInfo0 + data.name;
                            }else{
                                $scope.users.push(obj);
                                data.name = ' <span ></span>&nbsp;   <label class="i-checks i-checks-sm " ><input  id="user_'+data.userId+'" name="userBox"    type="checkbox" value="'+data.userId+'" /> <i></i> </label> <span >  <i class="glyphicon glyphicon-user "></i> </span >' +' <span>'+ data.name+'</span>';
                            }
                            $scope.orgData.push(data);
                        }

                        $scope.orgUserTreeObj = $.fn.zTree.init($("#treeDiv"), $scope.setting, $scope.orgData);
                        //初始化搜索节点集合
                        //$scope.treeNodes = $scope.orgUserTreeObj.transformToArray($scope.orgUserTreeObj.getNodes());
                        //展开树节点
                        $scope.orgUserTreeObj.expandAll(true);
                    }
                    else {
                        $scope.tipcontent = '未获取到任何数据.';
                        $scope.acpLayer.tips($scope.tipcontent)
                    }
                }
                else {
                    $scope.tipcontent = '加载数据失败,请检查服务器是否正常.';
                   // $scope.acpLayer.tips($scope.tipcontent)
                }
            }
            );
        }

    //节点定位
    $scope.searchNode = function (value,type) {

        if(value==''||value==null){
            $scope.toasterType.type= 'warning';
            $scope.toasterType.body="请输入搜索用户名称";
            $scope.pop();
            return;
        } 
       var allNodeList = $scope.orgUserTreeObj.refresh();

        var nodeList;
        if(type == 'name'){
            nodeList = $scope.orgUserTreeObj.getNodesByParamFuzzy("name", value);
        }
        if(type == 'id'){nodeList = $scope.orgUserTreeObj.getNodesByParam("id", value);}
        /* console.log(nodeList);*/
        if (nodeList.length > 0) {
            $("#"+nodeList[0].tId+"_span").css({"background-color":"#4DC078;"});
            $scope.orgUserTreeObj.selectNode(nodeList[0]);//默认选中第一个目标节点
        }
    };
}]);