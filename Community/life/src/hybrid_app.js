hybrid_app = function(){
 

};

var elif_app = new hybrid_app();


//app调用定位方法
location_callback =  function(para){
    elif_app.longitude = para.longitude;
    elif_app.latitude = para.latitude;
    prompt( elif_app.longitude+"//"+ elif_app.latitude);
    window.location.href="#/choose_locator";
  
};