elife.controller('ReviewIndexCtrl', ['$scope', 'SharedState', function($scope, SharedState){
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
   

}]);