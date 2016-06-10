 module.controller('GalleryPhotoswipe', function($scope, $timeout, slideFactory){

        $scope.initPhotoswipe = function(x) {
  
			$timeout(function(){
				var pswpElement = document.querySelectorAll('.pswp')[0];

			// build items array
			var items = [
			{
				src: 'lib/onsen/images/new/kabira-country-club-facility-aerial.jpg',
				w: 320,
				h: 240,
				title: 'Aerial view of kabira' 
			},
			{
				src: 'lib/onsen/images/new/swimming-pool-view-at-night.jpg',
				w: 320,
				h: 240,
				title: 'Pool at Night, ideal for parties' 
			},
			{
				src: 'lib/onsen/images/new/swimming-at-kabira.jpg',
				w: 320,
				h: 240,
				title: 'Olympic size swimming pool' 
			},

			{
				src: 'lib/onsen/images/new/res2.jpg',
				w: 320,
				h: 240,
				title: 'Delicious food at our restaurant' 
			},
			{
				src: 'lib/onsen/images/new/res3.jpg',
				w: 320,
				h: 240,
				title: 'Awesome food at the restaurant or room service in your hotel room' 
			},
			{
				src: 'lib/onsen/images/new/res1.jpg',
				w: 320,
				h: 240,
				title: 'Lunch for two at the hotel restaurant. #finedinning' 
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

			// define options (if needed)
			var options = {
				// optionName: 'option value'
				// for example:
				index: x, // start at first slide
				// Function builds caption markup
				addCaptionHTMLFn: function(item, captionEl, isFake) {
				    // item      - slide object
				    // captionEl - caption DOM element
				    // isFake    - true when content is added to fake caption container
				    //             (used to get size of next or previous caption)

				    if(!item.title) {
				        captionEl.children[0].innerHTML = '';
				        return false;
				    }
				    captionEl.children[0].innerHTML = "<b ng-click='myMenu.setMainPage('html/home.html', {closeMenu: true})'>Comments: </b> "+item.title;
				    return true;
				}
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
			gallery.listen('close', function() { 
			  myMenu.setMainPage('html/gallery.html', {closeMenu: true})
			});
			},500);
        };
		
		$scope.initPhotoswipe(slideFactory.getGallery());
		

    });
