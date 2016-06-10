module.config(function($stateProvider, $urlRouterProvider) {

	// By default show Tab 1 - Navigator MasterDetail example
	$urlRouterProvider.otherwise('/home');

	$stateProvider
// Tab 1 - MasterDetail example - Navigator init

		// Tab 2 - SlidingMenu example - Landing page
		.state('home', {
			url: '/home'
		})
		
		
		// Tab 2 - SlidingMenu example - Example page 2
		.state('home.detail', {
     		parent: 'home',
			url: '/detail/:id',
			onEnter: ['$rootScope', function($rootScope) {
				//$rootScope.myMenu.setMainPage('html/detail.html', {closeMenu: true});
				$rootScope.myNavigator.pushPage('html/detail.html');
			}],
			onExit: function($rootScope) {
				$rootScope.myNavigator.popPage();
			}
		})
		
		
		;

});