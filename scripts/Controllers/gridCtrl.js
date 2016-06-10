 module.controller('GridController', function($scope, $timeout){
	$timeout(function(){
				$('portfolio-list').filterable();
			},500);
        
    });

