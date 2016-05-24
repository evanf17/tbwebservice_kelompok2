'use strict';

// Services

var app = angular.module('App.services', []);

// Set values for use in page title

app.value('applicationName', 'kelompok2');
app.value('separator', ' - ');


app.factory('memberService', function ($http) {
	var baseUrl = 'http://localhost/webservice/server/member/';
	return {
		getAll: function () {
			return $http.get(baseUrl + 'tampil_member.php');
		},
		getId: function (memberId) {
			return $http.get(baseUrl + 'cari_member.php?member_id=' + memberId);
		},
		createmember: function (member) {
			return $http.post(baseUrl + 'tambah_member.php', member, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		updatemember: function (data) {
			return $http.post(baseUrl + 'ubah_member.php', data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		deletemember: function (member_id) {
			return $http.get(baseUrl + 'hapus_member.php?member_id=' + member_id);
		}
	};
})

app.factory('beritaService', function ($http) {
	var baseUrl = 'http://localhost/webservice/server/berita/';
	return {
		getAll: function () {
			return $http.get(baseUrl + 'tampil_berita.php');
		},
		getId: function (beritaId) {
			return $http.get(baseUrl + 'cari_berita.php?berita_id=' + beritaId);
		},
		createberita: function (berita) {
			return $http.post(baseUrl + 'tambah_berita.php', berita, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		updateberita: function (data) {
			return $http.post(baseUrl + 'ubah_berita.php', data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		deleteberita: function (berita_id) {
			return $http.get(baseUrl + 'hapus_berita.php?berita_id=' + berita_id);
		}
	};
})

app.factory('jadwalService', function ($http) {
	var baseUrl = 'http://localhost/webservice/server/jadwal/';
	return {
		getAll: function () {
			return $http.get(baseUrl + 'tampil_jadwal.php');
		},
		getId: function (jadwalId) {
			return $http.get(baseUrl + 'cari_jadwal.php?jadwal_id=' + jadwalId);
		},
		createjadwal: function (jadwal) {
			return $http.post(baseUrl + 'tambah_jadwal.php', jadwal, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		updatejadwal: function (data) {
			return $http.post(baseUrl + 'ubah_jadwal.php', data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
				}
			});
		},
		deletejadwal: function (jadwal_id) {
			return $http.get(baseUrl + 'hapus_jadwal.php?jadwal_id=' + jadwal_id);
		}
	};
})


app.factory('loginService', function ($http) {
	return {
		login: function (login) {
			return $http.get("http://localhost/webservice/server/login/login.php?user=" + login.username + "&pass=" + login.password + "");
		}
	};
});

app.factory("Data", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);