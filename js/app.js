(function (window, document, $, angular) {
	'use strict';

	var app = angular.module('App', [
		'ng',
		'ngRoute',
		'ngResource',
		'toaster',
		'App.controllers',
		'App.directives',
		'App.routes',
		'App.services',
    	'App.filters',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'oc.lazyLoad',
		'angularFileUpload'
	]);

	// Run
	app.run(function ($rootScope, $route, applicationName) {

		$rootScope.applicationName = applicationName;

		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = $route.current.title;
		});

	});

	app.run(function ($rootScope, $location, Data) {
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			$rootScope.authenticated = false;
			Data.get('session').then(function (results) {
				if (results.user_nama) {
					$rootScope.authenticated = true;
					$rootScope.user_nama = results.user_nama;
				} else {
					var nextUrl = next.$$route.originalPath;
					if (nextUrl == '/login') {

					} else {
						$location.path("/login");
					}
				}
			});
		});
	});
})(window, document, jQuery, angular);