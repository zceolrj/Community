elife.controller('IndexCtrl',['$scope', '$rootScope', '$timeout', '$cookieStore', '$http','API', function($scope, $rootScope, $timeout, $cookieStore, $http, API){
  // 初始化参数
  if(!$cookieStore.get('city_code')){
     $cookieStore.put('city_code','110100');
  }
  var countDown = 10000;
  var now = (new Date()).getTime();
  $scope.countDown = {
    _start: now,
    _end: now + countDown *1000,
    hourUpper: 0,
    hour: 0,
    minuteUpper: 0,
    minute: 0,
    secondUpper: 0,
    second: 0,
    _go: function(){
      var now = (new Date()).getTime();
      var rest = (this._end - now)/1000;

      var hour = Math.floor(rest/3600);
      this.hour = Math.floor(hour/10);
      this.hourUpper = hour % 10;

      var minute = Math.floor((rest - hour * 3600)/ 60);
      this.minute = Math.floor(minute / 10);
      this.minuteUpper = minute % 10;

      var second = Math.floor(rest % 60 );
      this.second = Math.floor(second / 10);
      this.secondUpper = second % 10;
    }
  };
  //定位城市选择
  $scope.location = $cookieStore.get('city_name');
  var countFn = function(){
    $scope.countDown._go();
    $timeout(countFn, 1000);
  };
  countFn();

  // $rootScope.loading = true;
  API.getBannerInfo().then(function(data){
    $scope.bannerInfo = data;
    console.log("首页图片");
    console.log($scope.bannerInfo);
  }, function(data){
     
    // $scope.bannerInfo = [{
    //     "promotions_code": "110100",
    //     "image_name": "名称用于图片显示不了的提示",
    //     "image_url": "images/card_offer_top.jpg"
    // },{
    //     "promotions_code": "110100",
    //     "image_name": "名称用于图片显示不了的提示",
    //     "image_url": "images/card_offer_top.jpg"
    // },{
    //     "promotions_code": "110100",
    //     "image_name": "名称用于图片显示不了的提示",
    //     "image_url": "images/index_top.jpg"
    // }];
    console.error('宣传图片获取失败'+ data);
    $scope.toast('请检查网络状况');
    $scope.bannerInfo = [];
  });

  $scope.imgBaseUrl = $rootScope.imgBaseUrl;
  API.getHomeLargeCategory({
    e_row: 3
  }).then(function(data){
    console.log("行业大类：");
    console.log(data);
    $scope.largeCategory = data;
  }, function(data){
    $scope.largeCategory = []; 
    console.error("行业大类获取失败：" + data);
    $scope.toast('请检查网络状况');
  });
  
  
  // 精选优惠
  // API.getHomeSpecialOffer({
  //   count: 3 
  // }).then(function(data){
  //   $scope.specialOffer = data.data;
  // }, function(data){
  //   console.error("精选优惠获取失败：" + data);
  // });
  
    $scope.specialOffer = [
      {
        "store_name": "门店优惠标题",
        "image_url": "images/restaurant_bgps.jpg",
        "preferential_code": "252166254424",
        "o_price": "123",
        "n_price": "100"
      },
      {
        "store_name": "门店优惠标题",
        "image_url": "images/restaurant_bgps.jpg",
        "preferential_code": "252166254424",
        "o_price": "123",
        "n_price": "100"
      },
      {
        "store_name": "门店优惠标题",
        "image_url": "images/restaurant_bgps.jpg",
        "preferential_code": "252166254424",
        "o_price": "123",
        "n_price": "100"
      }
    ];
  

  // 推荐商户
  API.getHomeRecommandStore({
    count: 5 
  }).then(function(data){
    $scope.recommandStore = data;
  }, function(data){
    $scope.recommandStore = [
      {
        "store_code":"1111111",
        "store_name": "门店名称",
        "image_url": "images/restaurant_jdx.jpg",
        "title": "超值自助餐"
      },
      {
        "store_code":"1111111",
        "store_name": "门店名称",
        "image_url": "images/restaurant_jdx.jpg",
        "title": "超值自助餐"
      }
    ];
  });

  // 猜你喜欢
  // API.getHomeGuessLike({
  //   count: 5 
  // }).then(function(data){
  //   $scope.guessLike = data.data;
  // }, function(data){
  //   console.error("获取猜你喜欢列表失败：" + data);
  // });
  
    $scope.guessLike = [
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "4",
        "distance":"700",
        "small_type": "川菜/家常菜",
        "price": "200",
        "is_yd":"1",
        "is_fq":"0",
        "is_jf":"1",
        "is_sk":"0",
        "is_gh":"0",
        "is_tu":"0",
        "is_cx":"0",
        "is_ka":"0"
      },
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": 3,
        "distance":"700",
        "small_type": "川菜/家常菜",
        "price": "200",
        "is_yd":"1",
        "is_fq":"0",
        "is_jf":"1",
        "is_sk":"0",
        "is_gh":"0",
        "is_tu":"0",
        "is_cx":"0",
        "is_ka":"0" 

      }
    ];

    $scope.yidaiName="逸贷(分期)商户";
    $scope.jifenName="积分消费商户";
// app交互获取定位
  $scope.get_location = function(){
   
    var callback = location_callback;
    var para = {
     "key": "getGPS",
    "callBack": callback
    };

    ICBCUtil.nativeGetConfig(para);
   
  };


// app交互返回到客户端
  $scope.close_client = function(){
    // location_callback({
    //   "longitude":"11",
    //   "latitude":"122"
    // });

    ICBCUtil.returnBack();
    };

}]);