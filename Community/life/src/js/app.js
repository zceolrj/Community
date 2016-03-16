
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
  // 全局变量存储
  $rootScope.imgBaseUrl = "http://115.28.109.25/elife/dist";
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

