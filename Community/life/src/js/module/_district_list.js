elife.controller('DistrictListCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

$scope.setErrorDistrict = function(code, name){
	$rootScope.district_code = code;
	$rootScope.district_name = name;
	history.back();
}; 
}]);