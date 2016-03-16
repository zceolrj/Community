elife.controller('YidaiBusinessCtrl', ['$scope','$routeParams','SharedState','$http','$cookieStore','API', function ($scope,$routeParams, SharedState,$http,$cookieStore,API){
    
  $scope.name = $routeParams.name;
  $scope.loading = true;
  $scope.isEmpty = false;
    // if(SharedState.isActive('listFilter')){
    //   angular.element(document.body).addClass('has-modal');
    // }else{
    //   angular.element(document.body).removeClass('has-modal');
    // }

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
    if($scope.sRow){
      para.s_row = $scope.sRow;
    }else{
      para.s_row = 1;
    }

    if($scope.latitude){
      para.latitude = $scope.latitude;
    }else{
      para.latitude = "106.66566666";
    }
    if($scope.longitude){
      para.longitude = $scope.longitude;
    }else{
      para.longitude = "39.6656666";
    }

    para.type = "YD";

    //获取逸贷商户列表
    API.getYidaiBySearch(para).then(function(data){
        var list = data;
        console.log(data);
        // 解析商户图标
        for (var i=0; i<list.length; i++) {
          list[i].discount_role = API.resolveDiscountRole(list[i].discount_role);
          var stars=[];
          for(var j=0;j<5;j++)
          {
            if (j+1<=list[i].level)
            {
              stars[j] = {"type":"full"};
            }else if(j - list[i].level < 0)
            {
              stars[j] = {"type":"half"};
            }else {
              stars[j] = {"type" : "gray"};
            }
          }
          list[i].stars = stars;
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
    // if($scope.currentType){
    //   para.large_code = $scope.currentType.big_code ;
    // }
    // if($scope.currentSmallType){
    //   para.small_code = $scope.currentSmallType.small_code;
    // }
    // if($scope.currentDistrict){
    //   para.district_code = $scope.currentDistrict.countryCode || $scope.currentDistrict.districtCode;
    // }
     
   

  // 获取列表
  $scope.getList();
  
}]);