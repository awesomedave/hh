(function ($) {
module.directive("favourite", function() {
  var linkFunction = function(scope, element, attributes) {
    var section = element.children()[0];
    /*$(section).on("click", function(event) {
    	event.stopPropagation();
    	if ($(this).hasClass('faved')) {
    	  $(this).removeClass("faved");
    	}else{
          $(this).addClass("faved");
    	}
      
    });*/
  };
  return {
    restrict: "E",
    link: linkFunction
  };
});

})(jQuery);