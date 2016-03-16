elife.controller('PhotoEditCtrl', ['$scope', function ($scope) {
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
}]); 