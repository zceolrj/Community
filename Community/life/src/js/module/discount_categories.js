elife.controller('DiscountCategoriesCtrl', ['$scope', function ($scope) {
  $scope.showList=[];

  for(i=0; i<5; i++){
    $scope.showList[i]=false;
  }  
}]);