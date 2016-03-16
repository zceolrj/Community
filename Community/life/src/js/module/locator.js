//定位选择页面js
elife.controller('LocatorCtrl', ['$scope','$http', 'API', '$anchorScroll','$cookieStore','$timeout','_serarchCity', function($scope,$http, API, $anchorScroll,$cookieStore,$timeout,_serarchCity){

  var scrollable = document.getElementById('LocatorScrollableContent');
  // var scrollableContentController = elem.controller('scrollableContent');

  var alphas= [];
  for(var i =0, n = 26; i< n; i++){
    alphas.push(String.fromCharCode(65 + i));
  }

  $scope.getAlphas = function(){
    return alphas;
  };

  // 字母快速定位
  $scope.locate = function(id){
    var target = document.getElementById(id);
    if(scrollable && target){
      var offset = target.offsetTop - scrollable.offsetTop;
      scrollable.scrollTop = offset;
    }
  };

  //搜索面板的显示和展开
  $scope.searchPaneShow = false;
  $scope.toggleearchPane = function(show){
      $scope.searchPaneShow = show || false;
  };

  // || 2015.5.4 ||

  // 获取热门城市
  API.getHotSearchCity({}).then(function(data){
    $scope.hotCity = data;
  },function(data){
    $rootScope.toast("请检查网络状况");
  });
  // $http.post('http://223.223.177.38:8082/OFSTCUST/area/hotCity.action',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'country_code' : ''
  // }).success(function (data) {
  //   console.log(data);
  //   if (data.res == "0") {
  //     $scope.hotCity = data.data;
  //   }
  // });
  
  // 获取城市列表
  API.getCity({}).then(function(data){
    $scope.areaInfo = data[0];
    var citys = data;
    $scope.allCity = citys;
  },function(data){
    //do nothing
  });
  // $http.post('http://223.223.177.38:8082/OFSTCUST/area/showAlphaCity.action',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'country_code' : 'CN'
    
  // })
  // .success(function (data) {
  //   if (data.res == '0') {
  //     // success
      
  //     $scope.areaInfo = data.data[0];
  //     console.log(data.data[0].A[0]);
  //     var citys = data.data;
  //     $scope.allCity = citys;
  //   }
  // });

  // 修改常住地


  $scope.doSubmitAddress = function (city_name) {
    API.changePersonalInfo({
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'address',
      'n_address' : city_name
    }).then(function(){
      history.back();
    },function(){
      $rootScope.toast("地址修改失败，请检查网络状况");
    });
    // $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/updateCuinfo.action',{
    //   't_k' : $cookieStore.get('t_k'),
    //   'c_no' : $cookieStore.get('c_no'),
    //   'req_type' : 'address',
    //   'n_address' : city_name
    // })
    // .success(function (data) {
    //   console.log(data);
    //   if (data.res == '0') {
    //     console.log('修改成功！');
    //     history.back();
    //   }
    // });
  };
  //修改定位城市
  $scope.doChooseAddress = function (city_code, city_name) {
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/updateCuinfo.action',{
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'address',
      'c_code' : city_code
    })
    .success(function (data) {
      console.log(data);
      if (data.res == '0') {
        console.log('修改成功！');
        $cookieStore.put('city_code',city_code);
        $cookieStore.put('city_name', city_name);
        history.back();
      }
    });
  };
    var timer;
    $scope.$watch('cityKeyword',function (newVal) {
      if (newVal) {
        if (timer) {
          $timeout.cancel(timer);
        }
        timer = $timeout(function () {
          // $http.post('http://223.223.177.38:8082/OFSTCUST/area/search.action',{
          //   't_k' : $cookieStore.get('t_k'),
          //   'c_no' : $cookieStore.get('c_no'),
          //   'country_code' : 'CN',
          //   'keyword' : newVal
          // })
          _serarchCity
          .success(function (data) {
            console.log(data);
            $scope.searchResultList = data.data;
          });
        },500);
      }
    });
}]);