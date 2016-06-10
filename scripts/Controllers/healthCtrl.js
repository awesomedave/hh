(function ($) {
  module.controller('health', function ($scope, slideFactory) {

    $scope.setAuto = function() {
      slideFactory.clear().then(function(){
        var count = 0;
        var intervalID = window.setInterval(function() {
          count = count + 1;
          if(count <= 3){
            healthslider.next();
          }else{
            healthslider.first();
            count = 0;
          }

        }, 2000);   
        slideFactory.set(intervalID); 
      });

    }
    $scope.setAuto();
        });
} )(jQuery);
