var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getAdmins = function(){
        return $http.get(serviceBase + 'admins');
    }
    obj.getAdmin = function(adminID){
        return $http.get(serviceBase + 'admin?id=' + adminID);
    }

    obj.insertAdmin = function (admin) {
    return $http.post(serviceBase + 'insertAdmin', admin).then(function (results) {
        return results;
    });
	};

	obj.updateAdmin = function (id,admin) {
	    return $http.post(serviceBase + 'updateAdmin', {id:id, admin:admin}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteAdmin = function (id) {
	    return $http.delete(serviceBase + 'deleteAdmin?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;   
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getAdmins().then(function(data){
        $scope.admins = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, admin) {
    var adminID = ($routeParams.adminID) ? parseInt($routeParams.adminID) : 0;
    $rootScope.title = (adminID > 0) ? 'Edit Admin' : 'Add Admin';
    $scope.buttonText = (adminID > 0) ? 'Update Admin' : 'Add New Admin';
      var original = admin.data;
      original._id = adminID;
      $scope.admin = angular.copy(original);
      $scope.admin._id = adminID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.admin);
      }

      $scope.deleteAdmin = function(admin) {
        $location.path('/');
        if(confirm("Are you sure to delete admin number: "+$scope.admin._id)==true)
        services.deleteAdmin(admin.admin_id);
      };

      $scope.saveAdmin = function(admin) {
        $location.path('/');
        if (adminID <= 0) {
            services.insertAdmin(admin);
        }
        else {
            services.updateAdmin(adminID, admin);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Admins',
        templateUrl: 'partials/admins.html',
        controller: 'listCtrl'
      })
      .when('/edit-admin/:adminID', {
        title: 'Edit Admins',
        templateUrl: 'partials/edit-admin.html',
        controller: 'editCtrl',
        resolve: {
          admin: function(services, $route){
            var adminID = $route.current.params.adminID;
            return services.getAdmin(adminID);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);