(function (window, document, $, angular) {
	"use strict";

	var app = angular.module('App', []);

	app.config(["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider", function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			modules: [{
				name: "ui.grid",
				files: ["libs/angular-ui-grid/ui-grid.css", "libs/angular-ui-grid/ui-grid.min.js"]
			}, {
				name: "ui.bootstrap",
				files: ["libs/angular-ui-bootstrap/ui-bootstrap.min.js", "libs/angular-ui-bootstrap/ui-bootstrap-tpls.min.js"]
      		}, {
				name: "ui.sortable",
				files: ["libs/jquery-ui/jquery-ui.min.js", "libs/angular-ui-sortable/sortable.js"]
      		}]
		});

		$stateProvider.state("angularui", {
			url: "/angularui/:type",
			controller: "AngularUIController",
			templateUrl: function ($stateParams) {
				return "libs/templates/" + $stateParams.type + ".html";
			},
			resolve: {
				resource: function ($http, $stateParams) {
					return $http.get("libs/data/angular/ui/" + $stateParams.type + ".json");
				},
				deps: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: "app.angularui." + $stateParams.type,
						files: ["js/ui/module-" + $stateParams.type + ".js"]
          			}]);
        		}]
			}
		});
	}]);
})(window, document, jQuery, angular);