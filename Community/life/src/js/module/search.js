elife.controller('IndexSearchCtrl', ['$scope','$rootScope', 'API','$cookieStore', function ($scope,$rootScope, API,$cookieStore) {
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


}]);