(function ($) {
  module.controller('main', function ($scope, slideFactory) {
    
    $scope.clearIntervals = function() {
      slideFactory.clear().then(function(){
        console.log("Cleared the slide interval");
      });
    }

  });
})(jQuery);
