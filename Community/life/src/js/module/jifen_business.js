elife.controller('JifenBusinessCtrl', ['$scope','$routeParams','SharedState','$http','$cookieStore','API', function ($scope,$routeParams, SharedState,$http,$cookieStore,API){
    
  $scope.name = $routeParams.name;
  $scope.loading = true;
  $scope.isEmpty = false;

  //列表排序选项开关
  $scope.sideTab2 = 0;
  $scope.selectType = function(type){
    $scope.currentType = type;
  };

  //列表排序选项开关
  $scope.filterToggle = function(n){
    if(n ===0){
      SharedState.turnOff('listFilter');
    }else{
      var index = SharedState.get('listFilterIndex') || 0;
      if(n === index){
        SharedState.toggle('listFilter');
      }else{
        SharedState.set({listFilterIndex:n});
        SharedState.turnOn('listFilter');
      }
    }
  };

  $scope.filterByDistrict = function(district){
    $scope.currentDistrict = district;
    $scope.getList();
    $scope.filterToggle(0);
  };

  $scope.filterByType = function(sType){
    $scope.currentSmallType = sType;
    $scope.getList();
    $scope.filterToggle(0);
  };

  $scope.filterBySort = function(sortType){
    $scope.currentSortType = sortType;
    $scope.getList();
    $scope.filterToggle(0);
  };

  API.getAllDistrict({
    
  }).then(function(data){
    $scope.hotCitys = data.top_list;
    $scope.citys = data.data;
  }, function(data){
    console.error("商区获取失败：" + data);
  });

  API.getAllType({
    
  }).then(function(data){
    $scope.allTypes = data;
    $scope.currentType = data[0];
  }, function(data){
    console.error("全部分类获取失败：" + data);
  });

  $scope.getList = function(){
    $scope.loading = true;
    para = { };
    if($scope.currentType){
      para.large_code = $scope.currentType.big_code ;
    }
    if($scope.currentSmallType){
      para.small_code = $scope.currentSmallType.small_code;
    }
    if($scope.currentDistrict){
      para.district_code = $scope.currentDistrict.countryCode || $scope.currentDistrict.districtCode;
    }
    if($scope.currentSortType){
      para.sort = $scope.currentSortType;
    }
    para.type = "JF";
    para.latitude = "";
    para.longitude = "";

    //获取积分消费商户列表
    API.getJifenBySearch(para).then(function(data){
      var list = data;
      // 解析商户图标
      for (var i=0; i<list.length; i++) {
        list[i].discount_role = API.resolveDiscountRole(list[i].discount_role);
      }
      $scope.storeList = list;
      if(list === undefined || list.length === 0){
        $scope.isEmpty = true;
      }
      $scope.loading = false;
    }, function(data){
      $scope.toast('请检查网络状况');
      $scope.loading = false;
      $scope.isEmpty = true;
    });
  };

  // 获取列表
  $scope.getList();

  
}]);