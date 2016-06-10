 module.controller('GalleryController', function($scope, $timeout, slideFactory){
 				$scope.items = [
			{
				src: 'lib/onsen/images/new/kabira-country-club-facility-aerial.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/swimming-pool-view-at-night.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/swimming-at-kabira.jpg',
				w: 320,
				h: 240
			},

			{
				src: 'lib/onsen/images/new/res2.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/res3.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/res1.jpg',
				w: 320,
				h: 240
			},

			{
				src: 'lib/onsen/images/new/gym1.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/gym2.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/kabira-club-gym.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/offer.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/tennis.jpg',
				w: 320,
				h: 240
			},
			{
				src: 'lib/onsen/images/new/massage.jpg',
				w: 320,
				h: 240
			}
			];
	 $scope.selectItem = function(event, index){
	    console.log("Clicked "+index);	 
	    slideFactory.setGallery(index);
	    myMenu.setMainPage('html/galleryPhotoswipe.html', {closeMenu: true});
	 }
	 
	 $scope.applyGrid = function(){
       $timeout(function(){
		var $grid = $('.grid').masonry({
		  // options
		  itemSelector: '.grid-item',
		  columnWidth: 100,
		  gutter: 20,
		  transitionDuration: '0.2s'

		});
		
		// layout Masonry after each image loads
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry('layout');
		});
		},200);
	 }

	 $scope.applyGrid();
	 
    });
