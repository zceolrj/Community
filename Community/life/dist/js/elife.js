
var elife = angular.module('elife', [
  'ngRoute',
  'ngCookies',
  'mobile-angular-ui',
  'mobile-angular-ui.core.fastclick',
  'at.multirange-slider',
  'angular-carousel',
  'mobile-angular-ui.core.outerClick'
])
.factory('_serarchCity', ['$http','$timeout','$cookieStore', function($http,$timeout,$cookieStore){
  console.log('cached');
  return  $http({
      method : 'post',
      url: 'http://192.168.2.60:8080/OFSTCUST/area/search.action',
      data : {
        't_k' : $cookieStore.get('t_k'),
        'c_no' : $cookieStore.get('c_no'),
        'country_code' : 'CN',
        'keyword' : ''
      },
      cache : true
    });
}])
.factory('_CONFIG_', ['$http','$cookieStore', function($http,$cookieStore){
  // 获取ua判断平台
  var ua = window.navigator.userAgent,
      os = (function () {
        if (/(iPhone|iPod|iPad|iOS)/i.test(ua)) {
          return 'ios';
        } else if (/Android/i.test(ua)) {
          return 'android';
        } else {
          return 'other';
        }
      })();
  // 获取令牌
  var t_k = $cookieStore.get('t_k'),
      c_no = 'AA';
  // 设置总体配置对象
  var elifeConf = {
    // 判断平台
    os : os,
    t_k : t_k,
    c_no : c_no,
    remoteHost : 'http://192.168.2.60:8080'
  };
  return elifeConf;
}])
.factory('_doLogin', ['$http','$cookieStore', function($http, $cookieStore){
  var url = 'http://192.168.2.60:8080/OFSTCUST/cuinfo/login.action',
      dat = {
        'userId' : '100001',
        'c_no' : 'AA'
      };
  return $http({
    method : 'POST',
    url : url,
    data : dat
  });
}])
.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home/index', {
        templateUrl: 'views/home/index.html',
        controller: 'IndexCtrl'
      })
      .when('/home/search',{
        templateUrl:'views/home/search.html',
        controller:'IndexSearchCtrl'
      })
      .when('/discount/search',{
        templateUrl:'views/discount/search.html',
        controller:'DiscountSearchCtrl'
      })
      .when('/discount/search_result',{
        templateUrl:'views/discount/offer_search_result.html',
        controller:'OfferSearchResultCtrl'
      })
      .when('/home/search_result/:keyword',{
        templateUrl:'views/home/business_search_result.html',
        controller:'BusinessSearchResultCtrl'
      })
      .when('/home/search_no_result',{
        templateUrl:'views/home/business_no_result.html',
        controller:'BusinessSearchResultCtrl'
      })
      .when('/discount/index',{
        templateUrl:'views/discount/index.html',
        controller:'IndexDiscountCtrl'
      })
      .when('/locator',{
        templateUrl:'views/home/locator.html',
        controller:'LocatorCtrl'
      })
      .when('/choose_locator',{
        templateUrl:'views/home/choose_locator.html',
        controller:'LocatorCtrl'
      })
      .when('/business/index/:id',{
        templateUrl:'views/home/business_info.html',
        controller:'BusinessInfoCtrl'
      })
      .when('/business/recommend',{
        templateUrl:'views/home/business_recommend.html',
        controller:'businessRecommendCtrl'
      })
      .when('/business/special_offer',{
        templateUrl:'views/home/special_offer.html',
        controller:'specialOfferCtrl'
      })
      .when('/discount/card_offer',{
        templateUrl:'views/discount/card_offer_info.html',
        controller:'IndexDiscountCtrl'
      })
      .when('/discount/bank_offer',{
        templateUrl:'views/discount/bank_offer_info.html',
        controller:'IndexDiscountCtrl'
      })
      .when('/discount/card_list',{
        templateUrl:'views/discount/card_offer_list.html',
        controller:'CardOfferListCtrl'
      })
      .when('/discount/business_offer',{
        templateUrl:'views/discount/business_offer_info.html',
        controller:'IndexDiscountCtrl'
      })
      .when('/discount/search_result',{
        templateUrl:'views/discount/offer_search_result.html',
        controller:'OfferSearchResultCtrl'
      })
      .when('/business/other_store',{
        templateUrl:'views/home/other_store.html',
        controller:'BusinessInfoCtrl'
      })
      .when('/business/available_store',{
        templateUrl:'views/home/available_store.html',
        controller:'BusinessInfoCtrl'
      })
      .when('/business_district',{
        templateUrl:'views/home/business_district.html',
        controller:'BusinessDistrictInfoCtrl'
      })
      .when('/error/other/:id',{
        templateUrl:'views/error/other_error.html',
        controller:'ErrorCtrl'
      })
      .when('/review/album',{
        templateUrl:'views/home/review_album.html',
        controller:'ReviewAlbumCtrl'
      })
      .when('/review/album_noup',{
        templateUrl:'views/home/review_album_noupload.html',
        controller:'ReviewAlbumCtrl'
      })
      .when('/business/album',{
        templateUrl:'views/home/business_album.html',
        controller:'ReviewAlbumCtrl'
      })
      .when('/error/business/:id',{
        templateUrl:'views/error/business_error.html',
        controller:'ErrorCtrl'
      })
      .when('/error/district/:id',{
        templateUrl:'views/error/district_error.html',
        controller:'ErrorCtrl'
      })
      .when('/business/detail/:id',{
        templateUrl:'views/home/business_detail.html',
        controller:'BusinessDetailCtrl'
      })
      .when('/review/index',{
        templateUrl:'views/home/review_index.html',
        controller:'ReviewIndexCtrl'
      })
      .when('/review/photo_added',{
        templateUrl:'views/home/review_photo_added.html',
        controller:'PhotoAddedCtrl'
      })
      .when('/review/photo_edit',{
        templateUrl:'views/home/review_photo_edit.html',
        controller:'PhotoEditCtrl'
      })
      .when('/review/comment',{
        templateUrl:'views/home/review_comment.html',
        controller:'ReviewCommentCtrl'
      })
      .when('/review/comment_personal',{
        templateUrl:'views/home/review_comment_personal.html',
        controller:'ReviewCommentCtrl'
      })
      .when('/discount/comment',{
        templateUrl:'views/home/review_comment.html',
        controller:'DiscountCommentCtrl'
      })
      .when('/home/yidai_business/:name',{
        templateUrl:'views/home/yidai_business.html',
        controller:'YidaiBusinessCtrl'
      })
      .when('/home/category/:id/:name',{
        templateUrl:'views/home/food.html',
        controller:'CategoryResultCtrl'
      })
      .when('/home/food',{
        templateUrl:'views/home/food_selected.html',
        controller:'CategoryResultCtrl'
      })
      .when('/discount/discount_food',{
        templateUrl:'views/discount/discount_food.html',
        controller:'OfferSearchResultCtrl'
      })
      .when('/home/categories',{
        templateUrl:'views/home/categories.html',
        controller:'HomeCategoriesCtrl'
      })
      .when('/discount/categories',{
        templateUrl:'views/home/categories.html',
        controller:'DiscountCategoriesCtrl'
      })
      .when('/discount/customers',{
        templateUrl:'views/discount/customers_info.html',
        controller:'CustomersInfoCtrl'
      })
      .when('/discount/customers_more',{
        templateUrl:'views/discount/customers_more_info.html',
        controller:'CustomersInfoCtrl'
      })
      .when('/discount/customers_add_order',{
        templateUrl:'views/discount/customers_add_order.html',
        controller:'CustomersInfoCtrl'
      })
      .when('/discount/customers_succeeded',{
        templateUrl:'views/discount/customers_succeeded.html',
        controller:'CustomersInfoCtrl'
      })
      .when('/district_list',{
        templateUrl:'views/error/district_list.html',
        controller:'DistrictListCtrl'
      })
      .when('/test',{
        templateUrl:'views/home/test.html',
        controller:'TestCtrl'
      })
      .when('/personal/index',{
        templateUrl:'views/personal/personal.html',
        controller:'PersonalCtrl'
      })
      .when('/personal/my_favorites',{
        templateUrl:'views/personal/my_favorites.html',
        controller:'MyFavoritesCtrl'
      })
      .when('/personal/my_customers',{
        templateUrl:'views/personal/my_customers.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/send_customers',{
        templateUrl:'views/personal/send_customers.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/my_comment',{
        templateUrl:'views/personal/my_comment.html',
        controller:'MyCommentCtrl'
      })
      .when('/personal/my_comment/:id',{
        templateUrl:'views/personal/my_comment_detail.html',
        controller:'MyCommentDetailCtrl'
      })
      .when('/personal/customers_drawback',{
        templateUrl:'views/personal/customers_drawback.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/customers_drawback_info',{
        templateUrl:'views/personal/customers_drawback_info.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/my_customers_info',{
        templateUrl:'views/personal/my_customers_info.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/my_customers_info_drawback',{
        templateUrl:'views/personal/my_customers_info_drawback.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/my_customers_info_unpaid',{
        templateUrl:'views/personal/my_customers_info_unpaid.html',
        controller:'MyCustomersCtrl'
      })
      .when('/personal/e_coupon',{
        templateUrl:'views/personal/e_coupon.html',
        controller:'ECouponCtrl'
      })
      .when('/personal/e_coupon_intro',{
        templateUrl:'views/personal/e_coupon_intro.html',
        controller:'ECouponCtrl'
      })
      .when('/personal/e_coupon_blank',{
        templateUrl:'views/personal/e_coupon_blank.html',
        controller:'ECouponCtrl'
      })
      .when('/personal/e_coupon_business_list',{
        templateUrl:'views/personal/e_coupon_business_list.html',
        controller:'ECouponCtrl'
      })
      .when('/personal/e_coupon_business_blank',{
        templateUrl:'views/personal/e_coupon_business_blank.html',
        controller:'ECouponCtrl'
      })
      //个人信息
      .when('/personal/personal_info',{
        templateUrl:'views/personal/personal_info.html',
        controller:'PersonalInfoCtrl'
      })
      .when('/personal/personal_change_nickname',{
        templateUrl:'views/personal/personal_change_nickname.html',
        controller:'PersonalInfoCtrl'
      })
      .when('/personal/personal_change_nickname',{
        templateUrl:'views/personal/personal_change_nickname.html',
        controller:'PersonalInfoCtrl'
      })
      .when('/personal/personal_change_nickname',{
        templateUrl:'views/personal/personal_change_nickname.html',
        controller:'PersonalInfoCtrl'
      })
      .when('/personal/personal_change_tel',{
        templateUrl:'views/personal/personal_change_tel.html',
        controller:'PersonalInfoCtrl'
      }) 
      .when('/personal/personal_change_passwd',{
        templateUrl:'views/personal/personal_change_passwd.html',
        controller:'PersonalInfoCtrl'
      })
      //我的交易明细
      .when('/personal/trade',{
        templateUrl:'views/personal/trade_list.html'
      })
      .when('/personal/trade_detail',{
        templateUrl:'views/personal/trade_detail.html'
      })
      .when('/personal/trade_returns',{
        templateUrl:'views/personal/trade_returns.html',
        controller:'PersonalCtrl'
      })
      // 更多模块
      .when('/more/index',{
        templateUrl:'views/more/index.html',
        controller:'PersonalCtrl'
      })
      .when('/more/feedback',{
        templateUrl:'views/more/feedback.html',
        controller:'PersonalCtrl'
      })
      .when('/more/help',{
        templateUrl:'views/more/help.html',
        controller:'PersonalCtrl'
      })
      .when('/error/district_list',{
        templateUrl:'views/error/district_list.html',
        controller:'DistrictListCtrl'
      })
      .when('/error/categories',{
        templateUrl:'views/error/categories.html',
        controller:'HomeCategoriesCtrl'
      })
      //我的订单

      .when('/personal/orders',{
        templateUrl:'views/personal/orders.html'
      })
      .when('/personal/app_orders',{
        templateUrl:'views/personal/app_orders.html'
      })
      .when('/personal/ewm_orders',{
        templateUrl:'views/personal/ewm_orders.html'
      })
      .when('/personal/pay_orders',{
        templateUrl:'views/personal/pay_orders.html'
      })
      .when('/home/jifen_business/:name',{
        templateUrl:'views/home/jifen_business.html',
        controller:'JifenBusinessCtrl'
      })
      ;
}])
/* ||2015.5.4|| */
.config(['$httpProvider',function($httpProvider) {
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
 
            for (name in obj) {
                value = obj[name];
 
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }
 
            return query.length ? query.substr(0, query.length - 1) : query;
        };
 
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}])
/* ||2015.5.4|| */
.controller('MainController', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout){
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  $rootScope.toast = function(content, duration){
    duration = duration || 3000;
    $scope.toastShow = true;
    $scope.toastContent = content;
    if(this._timer){
      $timeout.cancel(this._timer);
    }
    this._timer = $timeout(function(){
      $scope.toastShow = false;
    }, duration);
  };
  $scope.toastShow = false;
  $scope.toastContent = '';

}])
.directive('pageTitle', [function(){
    return {
      restrict: 'A',
      compile: function(elem, attrs) {
        var title = attrs.pageTitle;
        return function(scope, elem) {
            document.title = title ;
        };
      }
    };
  }
]);

;elife.factory('API', ['$rootScope', '$http', '$q', '$cookieStore', function($rootScope, $http, $q, $cookieStore){
  //var baseUrl = 'http://223.223.177.38:8082',
  var baseUrl = 'http://223.223.177.32:8082',
      // baseUrl = 'http://0478fedc.ngrok.io',
      currentUser,
      token,
      c_no = 'AA',
      city = {
        // code: 10020,
        // name: 城市
      },
      api = {
        baseUrl: baseUrl,
      };

  $rootScope.baseUrl = baseUrl;

  var ready = $q.defer();

  (function(){
    // 获取ua判断平台
    var ua = window.navigator.userAgent,
        os = (function () {
          if (/(iPhone|iPod|iPad|iOS)/i.test(ua)) {
            return 'ios';
          } else if (/Android/i.test(ua)) {
            return 'android';
          } else {
            return 'other';
          }
        })();
    // 获取令牌
    var t_k = $cookieStore.get('t_k'),
        c_no = 'AA';
    // 设置总体配置对象
    api.elifeConf = {
      // 判断平台
      os : os,
      t_k : t_k,
      c_no : c_no,
      remoteHost : baseUrl
    };

    // 尝试登录
    var loginPromise = request(
      baseUrl + '/OFSTCUST/cuinfo/login.action',
      'post',
      {
        'userId' : '100001',
        'c_no' : 'AA'
      }
    );
    
    loginPromise.then(function(data){
      console.log(data);
      token = data.t_k;
      if(!$cookieStore.get('city_code') || !$cookieStore.get('city_name')){
        $cookieStore.put('city_code','110100');
        $cookieStore.put('city_name','北京');
      }
      $cookieStore.put('t_k',data.t_k);
      $cookieStore.put('c_no','AA');
      $cookieStore.put('cn_code','CN');
      $cookieStore.put('country_code','CN');
      $cookieStore.put('longitude', '106.66566666');
      $cookieStore.put('latitude', '39.6656666');
      
      ready.resolve();
    }, function(data){
      console.info('login failed with code:' + data);
      ready.resolve();
    });
  })();

  /*本地数据存储*/
  var Storage = {
    put: function(key, obj){
      var str = JSON.stringify(obj);
      localStorage.setItem(key, str);
    },
    get: function(key){
      var str = localStorage.getItem(key);
      return JSON.parse(str);
    }
  };


  function request(url, method, data, cache){
    cache = cache || true;
    var deferred = $q.defer();
    $http({
      method : method,
      url: url,
      data : data,
      cache : true
    })
    .success(function(result, status) {
      if(result && result.res){
        if(result.res == '0'){
          deferred.resolve(result.data || result);
        }else{
          deferred.reject(result.res, result);
        }
      }
    })
    .error(function(data, status) {
      deferred.reject(status, 'network failed');
    });

    return deferred.promise;
  }


  function requestRaw(url, method, data, cache){
    cache = cache || true;
    var deferred = $q.defer();
    $http({
      method : method,
      url: url,
      data : data,
      cache : true
    })
    .success(function(result, status) {
      if(result && result.res){
        if(result.res == '0'){
          deferred.resolve(result);
        }else{
          deferred.reject(result.res, result);
        }
      }
    })
    .error(function(data, status) {
      deferred.reject(status, 'network failed');
    });

    return deferred.promise;
  }

  api.onLoginReady = function(){
    return ready.promise();
  };
  /* 登录状态验证 */
  api.isLogin = function(){
    return !!token;
  };
  /*获取用户信息*/
  api.getUserInfo = function(){
    var para = {
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no')
    };
    var promise = request(
      baseUrl + '/OFSTCUST/cuinfo/findCuMoreById.action',
      'post',
      para
    );
    return promise;
  };



/********************首页模块************************
*****************************************************/ 


  /*获取首页banner信息*/
  api.getBannerInfo = function(){
    var para = {
      city_code : $cookieStore.get('city_code'),
      count : 3
    };
   
    var promise = request(
      baseUrl + '/OFSTCUST/banner/bannerInfo.action',
      'post',
      para
    );
    return promise;
  };
  /*首页，行业大类*/
  api.getHomeLargeCategory = function(para){
    para.city_code = para.city_code || $cookieStore.get('city_code');
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，工行服务搜索*/
  api.getHomeGhService = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getStoreCreditList.action',
      'post',
      para
    );
    return promise;
  };
  /*首页，精选优惠*/
  api.getHomeSpecialOffer = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，搜索历史记录*/
  api.getHomeSearchHistory = function(){
    var key = "HOME_SEARCH_HISTORY";
    return Storage.get(key);
  };
  api.addHomeSearchHistory = function(keyword){
    var key = "HOME_SEARCH_HISTORY";
    var historys = Storage.get(key);
    var index = historys.indexOf(keyword);
    if(index != -1){
      historys.splice(index, 1);
      historys.unshift(keyword);
    }else{
      historys.unshift(keyword);
    }
    Storage.put(key, historys);
    return ;
  };
  /*首页，清除历史记录*/
  api.clearHomeSearchHistroy = function(){
    var key = "HOME_SEARCH_HISTORY";
    return Storage.put(key,[]);
  };

  // 搜素热门城市
  api.getHotSearchCity = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.country_code = para.country_code || "CN";
    para.top_count = para.top_count || "6";
    var promise = request(
      baseUrl + '/OFSTCUST/area/hotCity.action',
      'post',
      para
      );
    return promise;
  };


  /*首页，更多精选优惠*/
  api.getMoreSpecialOffer = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };



  /*首页，推荐商户*/
  api.getHomeRecommandStore = function(para){
    // var promise = request(
    //   baseUrl + '/OFSTCUST/industry/findBtn.action',
    //   'post',
    //   para
    // );
    // return promise;
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.count = 2;
    para.city_code = $cookieStore.get('city_code');
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getRecommendedStore.action',
      'post',
      para
    );
    return promise;
  };

  /*更多推荐商户*/
  api.getMoreRecommandStore = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/storecredit/getRecommendedStore.action',
      'post',
      para
    );
    return promise;
  };

  /*首页，猜你喜欢*/
  api.getHomeGuessLike = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/findBtn.action',
      'post',
      para
    );
    return promise;
  };

 /*全部商区和热门商区*/
  api.getAllDistrict = function(para){
    para.city_code = para.city_code || 110100;
    para.Cn_code = $cookieStore.get('cn_code');
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    var promise = requestRaw(
      baseUrl + '/OFSTCUST/businessdistrict/listDistrict.action',
      'post',
      para
    );
    return promise;
 };
 /*附近搜索*/
  api.getNearBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storedetail/getFoodHome.action',
      'post',
      para
    );
    return promise;
  };
  /*根据城市获取行业大类和行业小类*/
  api.getAllType = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/industry/getAllType.action',
      'post',
      para
    );
    return promise;
  };


 /*逸贷商户筛选*/
  api.getYidaiBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      'post',
      para
    );
    return promise;
  };
  
 /*工行卡优惠筛选*/
  api.getCardOfferBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storeisyd/?',
      'post',
      para
    );
    return promise;
  };




  //获取热门城市
  api.getCity = function(para){
    para.t_k = $cookieStore.get('t_k');
    para.c_no = $cookieStore.get('c_no');
    para.country_code = para.country_code || "CN";
    var promise = request(
      baseUrl + '/OFSTCUST/area/showAlphaCity.action',
      'post',
      para
      );
    return promise;

  };
  //获取城市列表

 /*积分消费商户筛选*/
  api.getJifenBySearch = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      'post',
      para
    );
    return promise;
  };

   /*首页顶部-关键词搜索*/
  api.getStore = function(para){
    para.city_code = para.city_code || 110100;
    var promise = request(
      //baseUrl + '/OFSTCUST/storeisyd/getStoreIsydList.action',
      baseUrl + '/OFSTCUST/storequery/list.action',
      'post',
      para
    );
    return promise;
  };

  /*解析商户门店小图标*/
  api.resolveDiscountRole = function(para){
    // 原字符串得各个位，值为1表明相应图标应显示，数量达到3个后直接返回
    var resultValue = new Array(3);
    var resultRole = new Array("yi","shan","ji","fen","gong","tuan","shua","cu","yu");

    var index=0;
    for (var i = 0; i < resultRole.length; i++) {
      // 如果满足要求的图标已经达到3个，直接返回
      if(index > 2){
        return resultValue;
      }
      if(para.charAt(i) == '1'){
        resultValue[i] = " icon_" + resultRole[i];
        index++;
      }
    }
    
    return resultValue;
  };






/********************我的模块************************
*****************************************************/ 
 // 获取我的电子券

 //修改个人信息
  api.changePersonalInfo = function(para){
    var promise = request(
      baseUrl + '/OFSTCUST/cuinfo/updateCuinfo.action',
      'post',
      para
      );
    return promise;
  };

  return api;
}]);;elife.controller('DistrictListCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

$scope.setErrorDistrict = function(code, name){
	$rootScope.district_code = code;
	$rootScope.district_name = name;
	history.back();
}; 
}]);;elife.controller('BusinessDetailCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', 'SharedState', function($scope,$http, $cookieStore,$routeParams, SharedState){
  $scope.id=$routeParams.id;

$scope.getBusiDetail = function(store_code){
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
  }).success(function(date){
    data = {
      "res": "0",
      "data": {
        "store_code": "102030411111",
        "store_info": "商户简介信息.......",
        "store_ts": "商户特色......",
        "start_time": "07:00",
        "end_time": "23:00"
      }
    };
    var info = data.data;
    console.log(info);
    $scope.busiDetail = info;
  });
};
$scope.getBusiDetail($scope.id);

}]);

;elife.controller('BusinessDistrictInfoCtrl',['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore){
  $scope.showItem0 = false;
  $scope.showItem1 = false;
  $scope.subDistrictArray = "";

    // 获取全部商区
  $http.post('http://223.223.177.38:8082/OFSTCUST/businessdistrict/listDistrict.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'Cn_code' : $cookieStore.get('cn_code'),
    'city_code' :  $cookieStore.get('city_code')
  }).success(function (data) {
    console.log(data);
    console.log($cookieStore.get('cn_code'));
    console.log($cookieStore.get('city_name'));
    if (data.res == "0") {
     $scope.districtInfo = data.data;
     console.log($scope.districtInfo);
     $scope.topDistrict = data.top_list;
    }
  });
}]);;elife.controller('BusinessInfoCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', 'SharedState', function($scope,$http, $cookieStore,$routeParams, SharedState){
  $scope.hideCustomersList=true;
  $scope.hideIcbcList=true;
  $scope.checkInfoIcbc="查看更多";
  $scope.checkInfoCustomers="查看更多";
  $scope.id=$routeParams.id;
 document.getElementById("btitle").innerHTML = window.history.length;
 console.log("a"+history.length);

  //收藏需要替换url
 $scope.AddFavor = function (){
  console.log("开始收藏");
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
  'city_code' : $cookieStore.get('city_code')
  })
  .success(function (data) {
    if(data.res === 0){
      console.log("成功");
    }
    if(data.res === 1000002){
      console.log("失败");
    }
    if(data.res === 1000003){
      console.log("缺少参数");
    }

  });
 };

  //TODO 商户详情 2015-05-10 12:29:56 
$http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
  'city_code' : ''
})
.success(function (data) {
  data={
    "res" : 0,
    "data" :
    {
      "store_code": "102030411111",
      "store_name": "商户名称",
      "image_url": "http://",
      "image_name": "test",
      "address": "海淀区",
      "dcmt_level": "5",
      "distance": "700",
      "small_type": "川菜/家常菜",
      "people_consumption": "200",
      "praise_count":"3",
      "sentiment_count":"2000",
      "view_count":"11111",
      "tel_phone":"010-999999",
      "is_yd":"1",
      "is_fq":"0",
      "is_jf":"1",
      "is_sk":"0",
      "is_gh":"0",
      "is_tu":"0",
      "is_cx":"0",
      "is_ka":"0",
      "is_free":"1",
      "is_wifi":"0",
      "is_credit_card":"1",
      "start_time":"09:00",
      "end_time":"22:00"

    }
  };
    var info = data.data;
    $scope.busiInfo = {
      "store_code" : info.store_code,
      "store_name" : info.store_name,
      "image_url" : info.image_url,
      "image_name" : info.image_name,
      "address" : info.address,
     // "distance" : info.distance / 1000,
     // "small_type" : info.small_type,
      "people_consumption" : info.people_consumption,
      "sentiment_count" : info.sentiment_count,
      "praise_count" : info.praise_count,
      "view_count" : info.view_count,
      "tel_phone" : info.tel_phone,
      "start_time" : info.start_time,
      "end_time" : info.end_time,
      "is_wifi" : info.is_wifi == "0" ? "_gray" : "",
      "is_free" : info.is_free == "0" ? "_gray" : "",
      "is_credit_card" : info.is_credit_card == "0" ? "_gray" : ""
    };
    var icon_flags = [];
    icon_flags[0] = info.is_yd == "0" ? "none" : "yi";
    icon_flags[1] = info.is_fq == "0" ? "none" : "fen";
    icon_flags[2] = info.is_jf == "0" ? "none" : "ji";
    icon_flags[3] = info.is_sk == "0" ? "none" : "shan";
    icon_flags[4] = info.is_gh == "0" ? "none" : "gong";
    icon_flags[5] = info.is_tu == "0" ? "none" : "tuan";
    icon_flags[6] = info.is_cx == "0" ? "none" : "cu";
    icon_flags[7] = info.is_ka == "0" ? "none" : "ka";
    $scope.busiInfo.flags = icon_flags;
    var stars=[];
    for(var j=0;j<5;j++)
      {
        if (j+1<=info.dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info.dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
    $scope.busiInfo.stars = stars;
    $scope.flags = icon_flags;
    console.log($scope.busiInfo);
  });
$http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'store_code' : $scope.id,
}).success(function(data){
  data = {
    "res": "0",
    "data": [
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "俏江南望京店",
      "o_price": "150",
      "n_pirce": "99"
    },
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "俏江南望京店",
      "o_price": "150",
      "n_pirce": "99",
      "buy_count": "10023"

    },
    {
      "pft_code":"11111",
      "image_url": "http://",
      "image_name": "xxx",
      "title": "代金券",
      "o_price": "150",
      "n_pirce": "99"
    }

    ]
  };
  $scope.discounts = data.data;

});

$scope.otherStores = function(){
  
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
    'count' : 10//document.getElementById("keyword").value 
  })
    .success(function (data) {
      data = {
        "res": "0",
        "data": [
        {
          "store_code": "102030411111",
          "store_name": "123",
          "level": "1",
          "image_url": "",
          "district_name": "金融街",
          "distance": "100",
          "small_code": "1",
          "promotions_type": "255",
          "is_yd": "1",
          "is_fq": "0",
          "is_jf": "0",
          "is_sk": "0",
          "is_gh": "0",
          "is_tu": "0",
          "is_cx": "0",
          "is_ka": "0"
        },
        {
          "store_code": "102030411111",
          "store_name": "1221213",
          "level": "1.5",
          "image_url": "",
          "district_name": "金融街",
          "distance": "25000",
          "small_code": "22",
          "promotions_type": "127",
          "is_yd": "1",
          "is_fq": "0",
          "is_jf": "0",
          "is_sk": "0",
          "is_gh": "0",
          "is_tu": "0",
          "is_cx": "0",
          "is_ka": "0"
        }
        ]
      };
      var info = data.data;
      for (var i=0;i<info.length;i++)
      {
        var stars=[];
      var icon_flags=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=info[i].level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
        icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
        icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
        icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
        icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
        icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
        icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
        icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
        icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      }
      info[i].stars = stars;
      info[i].flags = icon_flags;
      info[i].price = info[i].promotions_type;
      }

      console.log(info);
      $scope.otherStores = info;
    });

};
$scope.otherStores();

$scope.getBusiDetail = function(store_code){
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'store_code' : $scope.id,
  }).success(function(date){
    data = {
      "res": "0",
      "data": {
        "store_code": "102030411111",
        "store_info": "商户简介信息.......",
        "store_ts": "商户特色......",
        "start_time": "07:00",
        "end_time": "23:00"
      }
    };
    var info = data.data;
    console.log(info);
    $scope.busiDetail = info;
  });
};

//商户关闭和重复报错
$scope.errorReport = function(type){
  //TODO
};

}]);

;elife.controller('businessRecommendCtrl',['$scope', 'SharedState', 'API', function($scope, SharedState, API){
  // //列表排序选项开关
  // $scope.filterToggle = function(n){
  //   if(n ===0){
  //     SharedState.turnOff('listFilter');
  //   }else{
  //     var index = SharedState.get('listFilterIndex') || 0;
  //     if(n === index){
  //       SharedState.toggle('listFilter');
  //     }else{
  //       SharedState.set({listFilterIndex:n});
  //       SharedState.turnOn('listFilter');
  //     }
  //   }
  
    
  // };

  API.getMoreRecommandStore({
    count: 20
  }).then(function(data){
    $scope.storeList = data;
  }, function(data){
    console.error("推荐商户页面获取失败：" + data);
  });

   // 更多推荐商户
  // API.getMoreRecommandStore({
  //   count: 20 
  // }).then(function(data){
  //   $scope.storeList = data;
  // }, function(data){
  //   $scope.storeList = [
  //     {
  //       "cis_num": "102030411111",
  //       "mer_name": "商户名称",
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "address": "海淀区",
  //       "dcmt_level": "4",
  //       "distance":"700",
  //       "small_type": "川菜/家常菜",
  //       "price": "200",
  //       "isflag": true
  //     },
  //     {
  //       "cis_num": "102030411111",
  //       "mer_name": "商户名称",
  //       "image_url": "images/restaurant_qjn.jpg",
  //       "address": "海淀区",
  //       "dcmt_level": "5",
  //       "distance":"700",
  //       "small_type": "川菜/家常菜",
  //       "price": "200",
  //       "isflag": false
  //     }
  //   ];
  // });

  
  
}]);;elife.controller('BusinessSearchResultCtrl',['$scope', 'SharedState', '$routeParams', '$cookieStore', '$http',  'API', function($scope, SharedState, $routeParams, $cookieStore, $http, API){
  $scope.keyword = $routeParams.keyword || '';
  $scope.currentDistrict = {};
  $scope.currentSmallType = {};
  $scope.loading = true;
  $scope.isEmpty = false;
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
    $scope.citys = data.data;
    console.log($scope.hotCitys);
    console.log($scope.citys);
    console.log($scope.keyword);
    //修改全部商区的显示 2015-05-15
      var i = $scope.hotCitys.length;
      while(i --){
        if($scope.hotCitys[i].communityName == $scope.keyword){
          $scope.currentDistrict.communityName = $scope.keyword;
        }
      }
      i = $scope.citys.length;
      while(i --){
        if($scope.citys[i].districtName == $scope.keyword){
          $scope.currentDistrict.districtName = $scope.keyword;
        }
      }
  }, function(data){
    console.error("商区获取失败：" + data);
    $scope.toast('请检查网络设置');
  });


  API.getAllType({
    
  }).then(function(data){
    $scope.allTypes = data;
    $scope.currentType = data[0];

    var len = data.length;
    var i = 0;
    while(i<len){
      $scope.small_industry_list = data[i].small_industry_list;
      var j = $scope.small_industry_list.length;
      while(j--){
        if($scope.small_industry_list[j].small_name == $scope.keyword){
          $scope.currentSmallType.small_name = $scope.keyword;
        }
      }
      i++;
    }

  }, function(data){
    console.error("全部分类获取失败：" + data);
  });

  $scope.getList = function(){
    $scope.isEmpty = false;
    $scope.loading = true;
    para = {
      'keyword': $scope.keyword,
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'city_code' : $cookieStore.get('city_code'),
      'longitude' : $cookieStore.get('longitude'),
      'latitude' : $cookieStore.get('latitude'),
      //'large_code' : $scope.large_code,
      //'small_code' : $scope.small_code,
    };

    API.getStore(para).then(function(data){
      console.log(data);
      $scope.list = data;
      $scope.loading = false;
      if(data === undefined || data.length === 0){
        $scope.isEmpty = true;
      }else{
        $scope.isEmpty = false;
      }
    }, function(data){
      $scope.toast('请检查网络状况');
      $scope.loading = false;
      $scope.isEmpty = true;
    });

    //保存搜索记录
    API.addHomeSearchHistory($scope.keyword);
  


  };
  // 获取列表
  $scope.getList();

  // 测试数据
  // $scope.list =  [
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111},
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111},
  // {"distance":  "700",
  //   "district_name":  "金融街",
  //   "img_url":  "/OFSTCUST/images/a.jpg",
  //   "large_code": "02",
  //   "level":  "5",
  //   "promotions_title":  "15元超值午餐",
  //   "promotions_type":  "127元/人",
  //   "small_code":  "川菜/家常菜",
  //   "store_code": 111111}
  // ];
  
  
  
}]);;elife.controller('Calculator', ['$scope', function ($scope){
      

  // 选择器方法
  $scope.Minus= function(n){
    if($scope.num>=n){
       $scope.num=  $scope.num-1;
        $scope.total_price =  $scope.num*$scope.price;
    }
  
  };
  $scope.Plus= function(m){
    if($scope.num<=m){
       $scope.num=  $scope.num+1;
       $scope.total_price =  $scope.num*$scope.price;
    }
   
  };
  $scope.Total= function(){
    if(isNaN($scope.num)){
      return 0;
    }
    else{
         $scope.total = ($scope.num*$scope.price).toString();
         $scope.total =  "￥"+$scope.total +".00";
        return $scope.total;
    }
  };
   $scope.default= function(){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
  };

}]);;elife.controller('CardOfferListCtrl', ['$scope','SharedState','$http','$cookieStore','API', function ($scope, SharedState,$http,$cookieStore,API){

  // 获取工行卡优惠列表
  // $http.post('http://192.168.2.60:8080/',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'city_code' : '',
  //   's_row' : '',
  //   'e_row' : ''
  // })
  // .success(function (data) {
  //     if (data.res == "0") {
  //       $scope.typeName = data.data.type_name;
  //       $scope.businessList = data.data.merchantsList;
  //     }
  // });

  $scope.typeName = '工行卡优惠';
  $scope.cardOfferList = [
    {
        "image_url": "images/restaurant_qjn.jpg",
        "title": "工行卡优惠标题",
        "begin_time": "2015-05-05",
        "count": "6"
    },
    {
        "image_url": "images/restaurant_qjn.jpg",
        "title": "工行卡优惠标题",
        "begin_time": "2015-05-05",
        "count": "6"
    }
  ];


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
  //列表排序选项开关
  $scope.sideTab2 = 0;
  $scope.selectType = function(type){
    $scope.currentType = type;
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
     
    API.getCardOfferBySearch(para).then(function(data){
      $scope.list = data;
    }, function(data){
      console.error("列表获取失败：" + data);
    });
  };
  // 获取列表
  $scope.getList();

  
}]);;// 团购详情，团购添加页面js
elife.controller('CustomersInfoCtrl', ['$scope','SharedState', '$http', '$cookieStore', '$routeParams',function($scope, SharedState, $http, $cookieStore,$routeParams){
  $scope.num=1;
  $scope.price=85;

 
 // 选择器方法
 $scope.Minus= function(){
    if($scope.num>=2){
       $scope.num=  $scope.num-1;
        
    }
  
  };
  $scope.Plus= function(){
    if($scope.num<=99){
       $scope.num = $scope.num+1;
      
    }
   
  };
  $scope.Total= function(){
    if(isNaN($scope.num)){
      return 0;
    }
    else{
         $scope.total = ($scope.num*$scope.price).toString();
         $scope.total =  "￥"+$scope.total +".00";
        return $scope.total;
    }
  };
   $scope.default= function(event){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
    event.target.value = $scope.num;
  };


  $scope.submitOrder= function(){
   if($scope.num === 1){
     location.href="#/discount/customers_succeeded";

   }
   else{
      SharedState.turnOn('submit_order_error_modal');
   }
  };
   // 收藏团购
    $scope.addCustomerFavor = function(){
    console.log("收藏团购");
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  't_code' : '11'
  })
  .success(function (data) {
    if(data.res === 0){
      console.log("成功");
    }
    if(data.res === 1000002){
      console.log("失败");
    }
    if(data.res === 1000003){
      console.log("缺少参数");
    }

  });
  };
}]);;elife.controller('DiscountCategoriesCtrl', ['$scope', function ($scope) {
  $scope.showList=[];

  for(i=0; i<5; i++){
    $scope.showList[i]=false;
  }  
}]);;elife.controller('DiscountCommentCtrl', ['$scope', function($scope){
  $scope.isTyping = false;
   $scope.globalStar = 0;
   $scope.tasteStar = 0;
   $scope.environmentStar = 0;
   $scope.serviceStar = 0;

   $scope.hideAvg = true;
   // 评价描述
   $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];
 

}]);;elife.controller('DiscountSearchCtrl', ['$scope', function ($scope){
 
  
}]);;elife.controller('ECouponCtrl',['$scope', '$http', '$cookieStore', 'SharedState', function ($scope, $http, $cookieStore, SharedState){
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

  //2015-05-09
  //TODO 
  // 获取我的电子券
  $http.post('http://223.223.177.38:8082/OFSTCUST/info/showEleTicket.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  })
  .success(function (data) {
    console.log(data);
    var info = data.data;
    console.log(info);
    $scope.ECoupons = [];
    for (var i=0; i < info.length; i ++){
      $scope.ECoupons[i] = {
        "Ec_name" : info[i].ec_name,
        "Ec_code" : info[i].ec_code,
        "Effect_beginDate" : info[i].effect_beginDate.substr(0,10),
        "Effect_endDate" : info[i].effect_endDate.substr(0,10),
        "Effect_content" : info[i].effect_content,
        "Effect_state" : info[i].effect_state
      };
    }
  })
  .error(function(data, status) {
      console.error("获取我的电子券失败：" + data);
      $scope.toast('请检查网络状况');
  });


}]);;elife.controller('ErrorCtrl', ['$scope', '$routeParams', '$cookieStore' , '$http', function ($scope, $routeParams, $cookieStore, $http) {
    $scope.id = $routeParams.id;
    $scope.errorReport = function(type){
        var data = {
            't_k' : $cookieStore.get('t_k'),
            'c_no' : $cookieStore.get('c_no'),
            'store_code' : $scope.id
        };
        data.type = type;
        if (type == "other"){
            data.is_close = 1;
        } else if (type == "store") {

        } else if (type == "position") {

        } else if (type == "close") {//此处不会出现
            
        }
        $http.post('http://xxxx', data).success(function(){
            console.log("提交成功");
            history.back();
        }); 
        history.back();
    };

      //TODO 商户详情 2015-05-10 12:29:56 
      $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
          't_k' : $cookieStore.get('t_k'),
          'c_no' : $cookieStore.get('c_no'),
          'store_code' : $scope.id,
          'city_code' : ''
      })
      .success(function (data) {
          data={
              "res" : 0,
              "data" :
              {
                  "store_code": "102030411111",
                  "store_name": "商户名称",
                  "image_url": "http://",
                  "image_name": "test",
                  "address": "海淀区",
                  "dcmt_level": "5",
                  "distance": "700",
                  "small_type": "川菜/家常菜",
                  "people_consumption": "200",
                  "praise_count":"3",
                  "sentiment_count":"2000",
                  "view_count":"11111",
                  "tel_phone":"010-999999",
                  "is_yd":"1",
                  "is_fq":"0",
                  "is_jf":"1",
                  "is_sk":"0",
                  "is_gh":"0", 
                  "is_tu":"0",
                  "is_cx":"0",
                  "is_ka":"0",
                  "is_free":"1",
                  "is_wifi":"0",
                  "is_credit_card":"1",
                  "start_time":"09:00",
                  "end_time":"22:00"

              }
          };
          var info = data.data;
          $scope.busiInfo = {
              "store_code" : info.store_code,
              "store_name" : info.store_name,
              "address" : info.address,
              "small_type" : info.small_type,
              "people_consumption" : info.people_consumption,
              "sentiment_count" : info.sentiment_count,
              "praise_count" : info.praise_count,
              "view_count" : info.view_count,
              "tel_phone" : info.tel_phone
 };
 console.log($scope.busiInfo);
});

//商户其他报错
$scope.otherErrorReport = function(type){
  // 跳转到商户首页
  window.location.href="#/business/index/102030411111";  

};

}]);;elife.controller('HomeCategoriesCtrl', ['$scope','$http', '$rootScope', '$cookieStore', function ($scope, $http, $rootScope, $cookieStore) {
  $scope.showList=[];

 
  $http.post('http://223.223.177.38:8082/OFSTCUST/industry/getAllType.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  }).success(function (data) {
      if (data.res == "0") {
      $scope.categoryInfo = data.data;
      console.log($scope.categoryInfo);
      $scope.big_name1 = $scope.categoryInfo[0].big_name;
      $scope.list1 =  $scope.categoryInfo[0].small_industry_list;
      console.log($scope.list1);
      }
  });

for(i=0; i<5; i++){
  $scope.showList[i]=false;
}

//商户信息报错中选择商户类型
$scope.setErrorType = function(small_code, small_name){
  $rootScope.small_code = small_code;
  $rootScope.small_name = small_name;
  history.back();
};


}]);;elife.controller('CategoryResultCtrl', ['$scope', '$routeParams', '$route', 'SharedState', 'API', function ($scope, $routeParams, $route, SharedState, API){
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
  
}]);;elife.controller('IndexCtrl',['$scope', '$rootScope', '$timeout', '$cookieStore', '$http','API', function($scope, $rootScope, $timeout, $cookieStore, $http, API){
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

}]);;elife.controller('IndexDiscountCtrl', ['$scope' ,'$http', '$cookieStore', '$routeParams', function ($scope,$http, $cookieStore,$routeParams) {
  // 弹窗交互数据

  // var aa = prompt('close');
  // document.getElementById("aa").innerHTML = aa;
  // if(aa=="closeIcon"){
  //   document.getElementById("foot").style.display = "none";
  //   document.getElementById("close_icon").style.display = "none";
  // }
//判断是不是e生活的客户端

     

    if(ICBCUtil.isElife()){
      document.getElementById("foot").style.display = "none";
      document.getElementById("close_icon").style.display = "none";
      document.getElementById("aa").innerHTML = aa;
    }
  $scope.test = function(){
    ICBCUtil.iOSExcuteNativeMethod("NATIVE://aaadd");
  };
 
 


  $scope.addBusinessFavor = function(){
    console.log("收藏商户");
    $http.post('http://192.168.2.60:8080/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  's_code' : '11',
  'pft_code' : $cookieStore.get('city_code')
  })
  .success(function (data) {
    if(data.res === 0){
      console.log("成功");
    }
    if(data.res === 1000002){
      console.log("失败");
    }
    if(data.res === 1000003){
      console.log("缺少参数");
    }

  });
  };
  // 收藏银行
  $scope.addBankFavor = function(){
    console.log("收藏银行");
    $http.post('http://192.168.2.60:8080/OFSTCUST/cuinfo/findCuMoreById.action ',{
  't_k' : $cookieStore.get('t_k'),
  'c_no' : $cookieStore.get('c_no'),
  'b_code' : '11',
  
  })
  .success(function (data) {
    if(data.res === 0){
      console.log("成功");
    }
    if(data.res === 1000002){
      console.log("失败");
    }
    if(data.res === 1000003){
      console.log("缺少参数");
    }

  });

  };

  
}]);;elife.controller('JifenBusinessCtrl', ['$scope','$routeParams','SharedState','$http','$cookieStore','API', function ($scope,$routeParams, SharedState,$http,$cookieStore,API){
    
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

  
}]);;//定位选择页面js
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
}]);;elife.controller('MyCommentCtrl',['$scope', 'SharedState', function($scope, SharedState){
  $scope.commentList = [
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！',
      more: '菜很好吃，服务非常赞。还有双重优惠，非常划算。不过人还是不少，如果没有提前预定，需要排队，建议提前约好时间，预留座。菜很好吃，服务非常赞。其务非常务非常好。'
    },
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！'
    },
    {
      business: '海底捞',
      star: 4.5,
      time: '2015-03-22',
      content: '不错不错，味道好极了！'
    },
  ];

  $scope.isEditing =false;
  // 待删除列表
  var deleteList = [];
  $scope.edit = function(){
    if($scope.isEditing){
      $scope.isEditing = false;
      //执行删除操作

    }else{
      $scope.isEditing = true;
      deleteList = [];
    }
  };

  $scope.select = function(comment){
    var index  = deleteList.indexOf(comment);
    if(index === -1){
      deleteList.push(comment);
    }else{
      deleteList.splice(index, 1);
    }
  };

  $scope.isSelect = function(comment){
    var index  = deleteList.indexOf(comment);
    return index != -1;
  };
  $scope.cancel = function(){
    $scope.isEditing = false;
    deleteList = [];
  };

  $scope.preDelete = function(){
    if(deleteList && deleteList.length > 0){
      SharedState.turnOn('comment_del_modal');
    }else{
      SharedState.turnOn('comment_error_modal');
    }
  };
  $scope.delete = function(){
    for(var i=0, n= deleteList.length; i<n; i++){
      var index  = $scope.commentList.indexOf(deleteList[i]);
      if(index != -1){
        $scope.commentList.splice(index, 1);
      }
    }
    $scope.isEditing = false;
  };
  
}]);

elife.controller('MyCommentDetailCtrl',['$scope', 'SharedState', '$routeParams', function($scope, SharedState, $routeParams){
  var id = $routeParams.id;

  var comment = {
    business: '海底捞',
    star: 4.5,
    starEnv: 3,
    starSrvs: 2,
    starTaste: 4,
    time: '2015-03-22',
    content: '不错不错，味道好极了！菜很好吃，服务非常赞。还有双重优惠，非常划算。不过人还是不少，如果没有提前预定，需要排队，建议提前约好时间，预留座。菜很好吃，服务非常赞。其务非常务非常好！'
  };
  $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];

  $scope.comment = comment;
}]);;elife.controller('MyCustomersCtrl', ['$scope', function ($scope){
  // 导航栏
  $scope.active = 1;
  //发送团购券check按钮
  $scope.send_check = -1;
   //退款check按钮
  $scope.drawbackCheck=[false,false];
  
  //选择器初始值
  $scope.num = 1;
  $scope.price = 17;

 // 选择器方法
 $scope.Minus= function(){
    if($scope.num>=2){
       $scope.num=  $scope.num-1;
        
    }
  
  };
  $scope.Plus= function(){
    if($scope.num<=99){
       $scope.num=  $scope.num+1;
      
    }
   
  };
  $scope.Total= function(){
    if(isNaN($scope.num)){
      return 0;
    }
    else{
         $scope.total = ($scope.num*$scope.price).toString();
         $scope.total =  "￥"+$scope.total +".00";
        return $scope.total;
    }
  };

  // 自动纠错
  $scope.default= function(event){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
    event.target.value = $scope.num;
  };
  
}]);;elife.controller('MyFavoritesCtrl',['$scope', '$http', '$cookieStore', 'SharedState', function($scope,$http, $cookieStore, SharedState){
  //是否点击顶部商户删除
  $scope.favor_delete = false;
  $scope.discount_delete = false;

  //商户选择
  $scope.favor_select = [];
  //优惠选择
  $scope.discount_select = [];

  //是否点击底部删除按钮
  $scope.delete_btn = false;

  $scope.showDelete = true;


  for(i=0;i<5;i++){
   $scope.favor_select[i]= false;
   $scope.discount_select[i]= false;
 }
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


   // 按底部删除商户按钮方法
   $scope.openModal = function(){
    if($scope.showDelete){
      if(!angular.element(document.getElementsByClassName("delete_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }
    else{
      if(!angular.element(document.getElementsByClassName("delete_discount_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }


  };
  
  //取消按钮
  $scope.deleteFavorCancel = function(){
    $scope.favor_delete = false;
  };

  $scope.deleteDiscountCancel = function(){
    $scope.discount_delete = false;
  };


  // 弹窗删除按钮方法
  $scope.delete= function(){
    if($scope.showDelete){
      angular.element(document.getElementsByClassName("delete_item")).remove();
    }
    else{
      angular.element(document.getElementsByClassName("delete_discount_item")).remove();
    }
  };


  // 按顶部删除商户按钮初始化
  $scope.deleteFavorIni= function(){
   $scope.favor_delete = true;
   for(i=0;i<5;i++){
     $scope.favor_select[i]= false;
   }
 };


    // 按顶部删除优惠按钮初始化
    $scope.deleteDiscountIni= function(){
      $scope.discount_delete = true;
      for(i=0;i<5;i++){
       $scope.discount_select[i]= false;
     }
   };

   $scope.getFavBusiness = function(keyword){
      //2015-05-09
  //TODO 
  // 获取商户收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'keyword' : keyword
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称1",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "3.5",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "300",
        "is_yd": "1",
        "is_fq": "0",
        "is_jf": "0",
        "is_sk": "0",
        "is_gh": "0",
        "is_tu": "0",
        "is_cx": "0",
        "is_ka": "0"
      },
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称2",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "4",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "201",
        "is_yd": "1",
        "is_fq": "0",
        "is_jf": "0",
        "is_sk": "0",
        "is_gh": "0",
        "is_tu": "0",
        "is_cx": "0",
        "is_ka": "0"
      }
      ]
    };
    var info = data.data;
    for (var i=0;i<info.length;i++)
    {
      var stars=[];
      var icon_flags=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=info[i].dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
      icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
      icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
      icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
      icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
      icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
      icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
      icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
      icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      info[i].stars = stars;
      info[i].flags = icon_flags;
    }

    console.log(info);
    $scope.FavBusinesses = info;
  });

};

$scope.getFavBusinessByConditions = function(keyword){
      //2015-05-09
  //TODO 
  // 通过级联条件获取商户收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
    'small_code' : '',
    'district_code' : '',
    'sort_code' : ''
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称1",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "3.5",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "300",
        "isflag": "true",
        "is_yd": "1",
        "is_fq": "0",
        "is_jf": "0",
        "is_sk": "0",
        "is_gh": "0",
        "is_tu": "0",
        "is_cx": "0",
        "is_ka": "0"
      },
      {
        "cis_num": "102030411111",
        "mer_name": "商户名称2",
        "image_url": "images/restaurant_qjn.jpg",
        "address": "海淀区",
        "dcmt_level": "4",
        "distance": "700",
        "small_type": "川菜/家常菜",
        "price": "201",
        "isflag": "false",
        "is_yd": "1",
        "is_fq": "0",
        "is_jf": "0",
        "is_sk": "0",
        "is_gh": "0",
        "is_tu": "0",
        "is_cx": "0",
        "is_ka": "0"
      }
      ]
    };
    var info = data.data;
    for (var i=0;i<info.length;i++)
    {
      var stars=[];
      var icon_flags=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=info[i].dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
        icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
        icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
        icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
        icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
        icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
        icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
        icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
        icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      }
      info[i].stars = stars;
      info[i].flags = icon_flags;
    }

    console.log(info);
    $scope.FavBusinesses = info;
  });
};

$scope.getFavDiscount = function(keyword){
      //2015-05-10
  //TODO 
  // 获取优惠收藏
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no'),
  })
  .success(function (data) {
    data = {
      "res": "0",
      "data": [
      {
        "pft_code":"11111",
        "image_url": "http://",
        "image_name": "图片名称提示",
        "title": "商户优惠标题",
        "o_price": "200",
        "n_pirce": "120"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "image_name": "图片名称提示",
        "title": "商户优惠标题",
        "o_price": "200",
        "n_pirce": "120"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "end_time": "2015-05-08",
        "borwse": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "end_time": "2015-05-08",
        "borwse": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "银行优惠标题",
        "count": "6"
      },
      {
        "pft_code":"11111",
        "image_url": "http://",
        "title": "团购标题",
        "begin_time": "2015-05-05",
        "count": "6"
      }
      ]
    };

    var info = data.data;

    console.log(info);
    $scope.FavDiscounts = info;
  });
};
$scope.getFavBusiness('');


    // if(SharedState.isActive('listFilter')){
    //   angular.element(document.body).addClass('has-modal');
    // }else{
    //   angular.element(document.body).removeClass('has-modal');
    // }
//删除商户收藏   
// $scope.delete = function(){
//   var store_codes = [];
//   //TODO 获取选中的商户
//   for(var i = 0; i < $scope.favor_select.length; i++){
//     if($scope.favor_select[i]){
//       store_codes.push($scope.FavBusinesses[i].cis_num);
//     }
//   }
//   $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
//     't_k' : $cookieStore.get('t_k'),
//     'c_no' : $cookieStore.get('c_no'),
//     'store_codes' : store_codes
//   }).success(function(data){
//     window.location.reload();
//   });
//   window.location.reload();
// };


  }]);;elife.controller('OfferSearchResultCtrl',['$scope', 'SharedState', 'API', function($scope, SharedState, API){
  
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

  // $http.post('http://192.168.2.60:8080/',{
  //   't_k' : $cookieStore.get('t_k'),
  //   'c_no' : $cookieStore.get('c_no'),
  //   'city_code' : '',
  //   's_row' : '',
  //   'e_row' : '',
  //   'keyword' : ''
  // })
  // .success(function (data) {
      // if (data.res == "0") {
      //   $scope.offerList = data.data;
      // }
  // });

  $scope.getList = function(){
    para = {};
      $scope.offerList = [
            {
                "store_code": "门店名称",
                "store_name": "",
                "distance": "700",
                "store_list": [
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    }
                ]
            },
            {
                "store_code": "门店名称",
                "store_name": "",
                "distance": "700",
                "store_list": [
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    },
                    {
                        "image_url": "images/restaurant_qjn.jpg",
                        "image_name": "xxx",
                        "title": "俏江南望京店",
                        "o_price": "150",
                        "n_price": "99",
                        "buy_count": "10023"
                    }
                ]
            }
        ];
  };
  // 获取列表
  $scope.getList();

  
  
  
}]);;elife.controller('PersonalCtrl', ['$scope', '$http', '$cookieStore', function ($scope, $http, $cookieStore) {
    // 弹窗交互数据
  // var aa = prompt('close');
  // document.getElementById("aa").innerHTML = aa;
  // if(aa=="closeIcon"){
  //   document.getElementById("foot").style.display = "none";
  //   document.getElementById("close_icon").style.display = "none";
  // }

  $scope.check= function(){
    var len  = document.getElementById("trade_return_content").value.length;
   if(len>999){
    $scope.content = $scope.content.substring(0, 999);
   }
  
  };

  // 获取我的电子券
  $scope.e_coupon_url = "#/personal/e_coupon";
  $http.post('http://223.223.177.38:8082/OFSTCUST/info/showEleTicket.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  })
  .success(function (data) {
    console.log(data);
    var info = data.data;
    if(angular.isUndefined(info)){
      $scope.e_coupon_url = "#/personal/e_coupon_blank";
    }
  });
  
}]);

;elife.controller('PersonalInfoCtrl', ['$rootScope','SharedState','$scope','$http','$cookieStore' ,'API', function ($rootScope,SharedState,$scope,$http,$cookieStore,API) {

  $scope.getGender = function () {
    return $scope.personalInfo.gender === '男' ? 0 : 1;
  };
  $scope.SetGender = function(i){
    if (i == $scope.getGender()) {
      return false;
    }
    $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/updateCuinfo.action',{
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'sex',
      'n_sex' : i
    })
    .success(function (data) {

      if (data.res == '0') {
        if (i===0) {
          $scope.personalInfo.gender="男";
        }
        else{
          $scope.personalInfo.gender="女"; 
        }
      }
    });
  };

  // || 2015.5.4 ||

  // 获取用户相关信息
  $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $cookieStore.get('t_k'),
    'c_no' : $cookieStore.get('c_no')
  })
  .success(function (data) {
  var info = data.data;
  console.log(data);
    $scope.personalInfo = {
    nickname : info.nickName,
    gender : (info.sex == '0' ? '男' : '女'),
    phone : info.phone,
    address : info.address,
    headuri : info.headuri
    };
    $scope.new_nickname = info.nickName;
    $scope.imageTmp = $scope.personalInfo.headuri;
    $scope.defaultImg = 'http://127.0.0.1:8080/dist/images/avatar.png';
    $scope.personalInfo.headuri = $scope.defaultImg;
    $http.get('$scope.personalInfo.headuri').success(function(data){
    $scope.personalInfo.headuri = imageTmp;
  });
  });

  // 获取用户相关信息
  // API.getUserInfo().then(function(data){
  //   var info = data;
  //   console.log(info);
  //   $scope.personalInfo = {
  //   nickname : info.nickName,
  //   gender : (info.sex == '0' ? '男' : '女'),
  //   phone : info.phone,
  //   address : info.address,
  //   headuri : info.headuri
  //   };
  //   $scope.new_nickname = info.nickName;
  // },function(data){
  //   $scope.toast('请检查网络设置');
  //   console.log(data);
  // });

  // 修改昵称
  $scope.doSubmitNickname = function () {
    $scope.nickname_error_reg = /[^\u4E00-\u9FA5\w\b_]{1}/;
    $scope.nickName_error = 0;
    if ($scope.new_nickname === '' || $scope.new_nickname === undefined) {
      $scope.nickName_error = 1;
      $scope.postmsg = '昵称不允许为空！';
      $rootScope.Ui.turnOn('modify_success_modal');
      return false;
    }
    if ($scope.nickname_error_reg.test($scope.new_nickname)){
      $scope.nickName_error = 1;
      $rootScope.toast("昵称格式错误，昵称只能使用24个字符以内的字母，数字，中文，下划线");
      return false;
    }
    if($scope.new_nickname.length > 24){
      $scope.nickName_error = 1;
      $rootScope.toast("昵称修改失败，昵称长度不符合");
      return false;
    }
    
    $rootScope.toast("正在修改昵称...");
    API.changePersonalInfo({
      't_k' : $cookieStore.get('t_k'),
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'nick',
      'n_nikename' : $scope.new_nickname
    }).then(function(data){
      history.back();
    },function(data){
      $rootScope.toast("昵称修改失败，请检查网络状况");
    });
    // $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/updateCuinfo.action',{
    //   't_k' : $cookieStore.get('t_k'),
    //   'c_no' : $cookieStore.get('c_no'),
    //   'req_type' : 'nick',
    //   'n_nikename' : $scope.new_nickname
    // })
    // .success(function (data) {
    //   console.log(data);
    //   var msg = '';
    //   switch (data.res) {
    //     case '0' :
    //     msg = '修改成功';
    //     break;
    //     default :
    //     msg = '修改失败';
    //   }
    //   $scope.postmsg = msg;
    //   $rootScope.Ui.turnOn('modify_success_modal');
    // });
  };

  //清空昵称
  $scope.doDeleteNickname = function(){
    $scope.new_nickname = '';
  };

  $scope.backToPersonalInfo = function () {
    if ($scope.new_nickname === '' || $scope.new_nickname === undefined || $scope.nickName_error == 1) {
      $rootScope.Ui.turnOff('modify_success_modal');
    } else {
      $rootScope.Ui.turnOff('modify_success_modal');
      history.back();
    }
  };


}]);;elife.controller('ReviewAlbumCtrl', ['$scope', function ($scope){
 
  
}]);;elife.controller('ReviewCommentCtrl', ['$scope', function($scope){
  $scope.isTyping = false;
   $scope.globalStar = 0;
   $scope.tasteStar = 0;
   $scope.environmentStar = 0;
   $scope.serviceStar = 0;
   // 评价描述-类型1
   $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];
   // 评价描述-类型2
   $scope.des2 = ['差', '一般', '好', '很好', '非常好'];
}]);;elife.controller('ReviewIndexCtrl', ['$scope', 'SharedState', function($scope, SharedState){
   // 显示哪条评论内容
   $scope.showText=-1; 
   // 显示哪个nav
   $scope.active_nav=-1;
   $scope.showModal=false;
   $scope.showModal=false;


   // 判断显示哪个nav
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

   // 判断显示哪个评论
   $scope.GetText = function(n){
    if($scope.showText==n){
      $scope.showText=-1;
    }
    else{
       $scope.showText=n;
    }
   };
   

}]);;elife.controller('PhotoAddedCtrl', ['$scope', function ($scope) {
  
}]);;elife.controller('PhotoEditCtrl', ['$scope', function ($scope) {
  // 照片旋转
  $scope.rotate = 0;
  $scope.doRotate = function(){
    $scope.rotate = ($scope.rotate + 1) % 4;

  };
  // 删除本张照片
   $scope.doDelete = function(){
      // 执行删除本张照片操作（应该是从cookie或者local存储中删除）

      // 返回照片编辑页面
       window.location.href="#/review/photo_added";

  };

  // 类别
  $scope.types = [
    {name: '菜品'},
    {name: '价目表'},
    {name: '环境'},
    {name: '饮品'}
  ];
  $scope.currentType = $scope.types[0];
  $scope.selectType = function(type){
    $scope.currentType = type;
  };
}]); ;elife.controller('IndexSearchCtrl', ['$scope','$rootScope', 'API','$cookieStore', function ($scope,$rootScope, API,$cookieStore) {
	$scope.showHistory=true;
	$scope.close_icon = true;
	$scope.searchValue="";
	/*
	function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			$scope.test1 = '有相关对象';
			callback(WebViewJavascriptBridge);
		} else {
			$scope.test1 = '没有相关对象';
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge);
			}, false);
		}
	}
	connectWebViewJavascriptBridge(function (interface_) {
		$scope.testCall = function () {
			if (interface_.callHandler) {
				interface_.callHandler('testObjcCallback', '111111', function(response) {
					if (response) {
						window.document.write('asdljfalksdjfa');
					}
				});
			}
		};
	});*/


	//点击回车，提交搜索
	$scope.keypress = function($e){
		if($e.keyCode == 13){
			if($scope.searchHeaderValue){
				window.location.hash = "/home/search_result/" + $scope.searchHeaderValue;
			}
		}
	};

//获取热门城市
 
API.getHotSearchCity({
	// t_k : $cookieStore.get('t_k'),
	// c_no : $cookieStore.get('c_no'),
	// country_code : $cookieStore.get('country_code'),
	// top_count : 6
}).then(function(data){
	console.log(data);
	$scope.hotKeywords = data;
	// console.log(data);
  },function(data){
    console.error("热门城市获取失败：" + data);
  });



	$scope.history = API.getHomeSearchHistory();
	$scope.clearHistory = function(){
		API.clearHomeSearchHistroy();
		$scope.history = [];

	};


}]);;elife.controller('SearchFilterCtrl', ['$scope', function ($scope) {
    $scope.isRight=true;
    $scope.isSlide=true;
	$scope.switch_btn=false;
	
	$scope.check_icbc=true;
	$scope.check_discount=true;
	$scope.check_reserve=true;


	$scope.map_toggle = function(){
		if($scope.switch_btn===true){
			$scope.switch_btn=false;
			$scope.isRight=false;
			$scope.isSlide=false;
		}
		else{
			$scope.switch_btn=true;
			$scope.isRight=true;
			$scope.isSlide=true;
		}
	};
	//是否选择所有
	$scope.check_toggle_all = function(){
    $scope.check=($scope.check_reserve)&&($scope.check_icbc)&&($scope.check_discount);
		if($scope.check===true){
      // console.log($scope.check);
			$scope.check_icbc=false;
			$scope.check_discount=false;
			$scope.check_reserve=false;
		}
		else{
			// console.log($scope.check);
			$scope.check_icbc=true;
			$scope.check_discount=true;
			$scope.check_reserve=true;
		}

	};
	

    
}])
.controller("Ctrl", ['$scope', function($scope) {

	$scope.slider = {
		left: {
			value: 100
		},
		middle: {
			value: 200
		},
		right: {
			value: 700
		}
	};
}]);

;elife.controller('specialOfferCtrl', ['$scope', '$timeout', '$cookieStore', '$http', 'API', function($scope, $timeout, $cookieStore, $http, API){

  // API.getMoreSpecialOffer({
  //   count: 20
  // }).then(function(data){
  //     $scope.merchantsList = data.data.merchants_list;
  //     $scope.groupList = data.data.group_list;
  //     $scope.bankList = data.data.bank_list;
  // }, function(data){
  //   console.error("精选优惠页面获取失败：" + data);
  // });

    $scope.merchantsList = [
        {
            "pft_code": "111111",
            "image_url": "",
            "title": "商户优惠标题",
            "pft_type": "满2000减500",
            "buss_area_code": "110100",
            "buss_area_name": "海淀区",
            "small_code": "11111",
            "small_name": "家常菜",
            "view_count": "17",
            "distance": "12"
        },
        {
            "pft_code": "111111",
            "image_url": "",
            "title": "商户优惠标题",
            "pft_type": "满2000减500",
            "buss_area_code": "110100",
            "buss_area_name": "海淀区",
            "small_code": "11111",
            "small_name": "家常菜",
            "view_count": "17",
            "distance": "12"
        }
    ];

    $scope.groupList = [
        {
            "group_code": "111111",
            "group_image_url": "",
            "group_title": "团购优惠标题",
            "group_pft": "代金券",
            "old_price": "200",
            "n_price": "1",
            "buy_count": "2000",
            "distance": "700"
        },
        {
            "group_code": "111111",
            "group_image_url": "",
            "group_title": "团购优惠标题",
            "group_pft": "代金券",
            "old_price": "200",
            "n_price": "1",
            "buy_count": "2000",
            "distance": "700"
        }
    ];

    $scope.bankList = [
        {
            "pft_code": "22222",
            "image_url": "",
            "title": "工行优惠标题1",
            "pft_type": "闪酷卡消费",
            "o_price": "300",
            "n_price": "200",
            "view_count": "2000",
            "distance": "800"
        },
        {
            "pft_code": "22222",
            "image_url": "",
            "title": "工行优惠标题1",
            "pft_type": "闪酷卡消费",
            "o_price": "300",
            "n_price": "200",
            "view_count": "2000",
            "distance": "800"
        }
    ];


}]);;elife.controller('TestCtrl', ['$scope','$http', function ($scope, $http) {
   $scope.aa="11";

      $http({
          method: 'post',
          url: 'http://115.28.109.25/h5_json/home/banner.php',
          data: $scope.aa,
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function(data, status, headers, config) {
          if(data.success){
               $scope.img = data;
               console.log("aaa");
               console.log(data);
          }
        });


}]);;elife.controller('YidaiBusinessCtrl', ['$scope','$routeParams','SharedState','$http','$cookieStore','API', function ($scope,$routeParams, SharedState,$http,$cookieStore,API){
    
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