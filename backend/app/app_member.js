var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getMembers = function(){
        return $http.get(serviceBase + 'members');
    }
    obj.getMember = function(memberID){
        return $http.get(serviceBase + 'member?id=' + memberID);
    }

    obj.insertMember = function (member) {
    return $http.post(serviceBase + 'insertMember', member).then(function (results) {
        return results;
    });
	};

	obj.updateMember = function (id,member) {
	    return $http.post(serviceBase + 'updateMember', {id:id, member:member}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteMember = function (id) {
	    return $http.delete(serviceBase + 'deleteMember?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;   
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getMembers().then(function(data){
        $scope.members = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, member) {
    var memberID = ($routeParams.memberID) ? parseInt($routeParams.memberID) : 0;
    $rootScope.title = (memberID > 0) ? 'Edit Member' : 'Add Member';
    $scope.buttonText = (memberID > 0) ? 'Update Member' : 'Add New Member';
      var original = member.data;
      original._id = memberID;
      $scope.member = angular.copy(original);
      $scope.member._id = memberID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.member);
      }

      $scope.deleteMember = function(member) {
        $location.path('/');
        if(confirm("Are you sure to delete admin member: "+$scope.member._id)==true)
        services.deleteMember(member.member_id);
      };

      $scope.saveMember = function(member) {
        $location.path('/');
        if (memberID <= 0) {
            services.insertMember(member);
        }
        else {
            services.updateMember(memberID, member);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Members',
        templateUrl: 'partials/members.html',
        controller: 'listCtrl'
      })
      .when('/edit-member/:memberID', {
        title: 'Edit Members',
        templateUrl: 'partials/edit-member.html',
        controller: 'editCtrl',
        resolve: {
          admin: function(services, $route){
            var memberID = $route.current.params.memberID;
            return services.getMember(memberID);
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