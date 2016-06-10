 module.controller('MapController', function($scope, $timeout){
	
        $scope.map;
        $scope.markers = [];
        $scope.markerId = 1;

        $scope.isEmptyObject = function(obj) {
          for(var prop in obj) {
			if (obj.hasOwnProperty('maps')) {
              return false;
            }
          }
          return true;
        }

        //Map initialization  
        $timeout(function(){
            var google = window.google;
            var checkMap = $scope.isEmptyObject(google);
            $scope.displayImageMap = checkMap;

            if(!checkMap) {
				var smallImage = $('#map_canvas');
				smallImage.empty();
				ons.ready(function() {
			$scope.alert;

ons.createDialog('html/alert.html').then(function(dialog) {
$scope.alert = dialog;
dialog.show();
});
});
            var latlng = new google.maps.LatLng(0.34997, 32.60003);
            var myOptions = {
                zoom: 16,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){
			// do something only the first time the map is loaded
			$scope.alert.hide();
			});
            var contentString = "<span>Kabira Country Club Hotel</span>"

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            var marker = new google.maps.Marker({
              position: latlng,
              map: $scope.map,
			  animation: google.maps.Animation.DROP,
              title: 'Kabira Country Club'
            });

            marker.addListener('click', function() {
              infowindow.open($scope.map, marker);
            });

            }else {
				//$scope.alert.hide();
				var smallImage = $('#map_canvas');
				smallImage.append("<img style='height: 100%; width: 100%;' src='lib/onsen/images/new/kabiramap2.png'/>");
				
				console.log("It is empty");
			}
        },500);


        $scope.rad = function(x) {
            return x * Math.PI / 180;
        };

    });
