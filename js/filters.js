'use strict';

// Filters

var app = angular.module('App.filters', []);

// Format the page title using values defined in services
app.filter('title', [
    'applicationName',
    'separator',
    function (applicationName, separator) {
		return function (text) {
			return applicationName + separator + text;
		}
    }
]);

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start; //parse to int
			return input.slice(start);
		}
		return [];
	}
});