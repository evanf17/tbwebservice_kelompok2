'use strict';

// Directives
var app = angular.module('App.directives', []);

app.directive('layoutNavbar', function () {
	return {
		restirct: 'A',
		templateUrl: 'views/partials/navbar.html'
	}
})

app.directive('layoutSidemenu', function () {
	return {
		restirct: 'A',
		templateUrl: 'views/partials/sidemenu.html'
	}
})

app.directive('layoutPagetitle', function () {
	return {
		restirct: 'A',
		templateUrl: 'views/partials/pagetitle.html'
	}
})

app.directive('layoutFooter', function () {
	return {
		restirct: 'A',
		templateUrl: 'views/partials/footer.html'
	}
})

app.directive("initFromForm", function ($parse) {
	return {
		link: function (scope, element, attrs) {
			var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
				val = attrs.value;
			$parse(attr).assign(scope, val);
		}
	};
})

app.directive('integer', function () {
	return {
		require: 'ngModel',
		link: function (scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
				return parseInt(viewValue, 10);
			});
		}
	};
});

app.directive('ngThumb', ['$window', function ($window) {
	var helper = {
		support: !!($window.FileReader && $window.CanvasRenderingContext2D),
		isFile: function (item) {
			return angular.isObject(item) && item instanceof $window.File;
		},
		isImage: function (file) {
			var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	};

	return {
		restrict: 'A',
		template: '<canvas/>',
		link: function (scope, element, attributes) {
			if (!helper.support) return;

			var params = scope.$eval(attributes.ngThumb);

			if (!helper.isFile(params.file)) return;
			if (!helper.isImage(params.file)) return;

			var canvas = element.find('canvas');
			var reader = new FileReader();

			reader.onload = onLoadFile;
			reader.readAsDataURL(params.file);

			function onLoadFile(event) {
				var img = new Image();
				img.onload = onLoadImage;
				img.src = event.target.result;
			}

			function onLoadImage() {
				var width = params.width || this.width / this.height * params.height;
				var height = params.height || this.height / this.width * params.width;
				canvas.attr({
					width: width,
					height: height
				});
				canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
			}
		}
	};
}]);

app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);