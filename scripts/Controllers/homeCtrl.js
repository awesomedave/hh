(function ($) {
  module.controller('home', function ($scope, slideFactory) {
    
    $scope.setAuto = function() {
      slideFactory.clear().then(function(){
        var count = 0;
        var intervalID = window.setInterval(function() {
          count = count + 1;
          if(count <= 6){
            homeslider.next();
          }else{
            homeslider.setActiveCarouselItemIndex(0, {animation: "fade"});
            count = 0;
          }

        }, 2000);   
        slideFactory.set(intervalID);

      });

    }
    $scope.setAuto();
  });
})(jQuery);
