elife.controller('CategoryResultCtrl', ['$scope', '$routeParams', '$route', 'SharedState', 'API', function ($scope, $routeParams, $route, SharedState, API){
  $scope.id = $routeParams.id;
  $scope.name = $routeParams.name;
  $scope.loading = true;
  $scope.isEmpty = false;


  // $scope.currentDistrict
  //列表排序选项开关
  $scope.sideTab2 = 0;
  $scope.selectType = function(type){
    $scope.currentType = type;
  };

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

  API.getAllDistrict({
    
  }).then(function(data){
    $scope.hotCitys = data.top_list;
    console.log($scope.hotCitys );
    $scope.citys = data.data;
  }, function(data){
    $scope.toast("请检查网络状况");
    console.error("商区获取失败：" + data);
  });



  API.getAllType({
    
  }).then(function(data){
    $scope.allTypes = data;
    $scope.currentType = data[0];
  }, function(data){
    $scope.toast("请检查网络状况");
    console.error("全部分类获取失败：" + data);
  });

  $scope.getList = function(){
    $scope.loading = true;
    $scope.isEmpty = false;
    para = {};
    if($scope.currentType){
      para.large_code = $scope.currentType.big_code ;
    }
    if($scope.currentSmallType){
      para.small_code = $scope.currentSmallType.small_code;
    }
    if($scope.currentDistrict){
      para.district_code = $scope.currentDistrict.countryCode || $scope.currentDistrict.districtCode;
    }
    API.getNearBySearch(para).then(function(data){
      $scope.list = data;
      $scope.loading = false;
      if(data === undefined || data.length === 0){
        $scope.isEmpty = true;
      }
    }, function(data){
      $scope.toast("请检查网络状况");
      $scope.isEmpty = true;
      $scope.loading = false;
      console.error("列表获取失败：" + data);
    });
  };
  // 获取列表
  $scope.getList();
  
}]);