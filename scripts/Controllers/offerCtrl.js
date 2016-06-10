(function ($) {
  module.controller('offer', function ($scope, slideFactory) {
    $scope.clearIntervals = function() {
      slideFactory.clear().then(function(){
        console.log("Cleared the slide interval");
      });
    }

    $scope.setAuto = function() {
      slideFactory.clear().then(function(){
        var count = 0;
        var intervalID = window.setInterval(function() {
          count = count + 1;
          if(count <= 4){
            offerslider.next();
          }else{
            offerslider.setActiveCarouselItemIndex(0, {});
            count = 0;
          }

        }, 2000);   
        slideFactory.set(intervalID); 
      });

    }
    $scope.setAuto();
        });
} )(jQuery);
