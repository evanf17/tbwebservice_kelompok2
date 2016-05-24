'use strict';

// Controllers
var app = angular.module('App.controllers', []);

app.controller('AppController', function ($scope, $window, applicationName, Data, $location) {
	$scope.menu = [
		{
			name: "Home",
			href: "#/home",
			icon: "fa fa-dashboard fa-3x"
        },

		{
			name: "Member",
			href: "#/member",
			icon: "fa fa-group fa-3x"
        },
		{
			name: "Berita",
			href: "#/berita",
			icon: "fa fa-envelope"
        },
		{
			name: "Jadwal",
			href: "#/jadwal",
			icon: "fa fa-calendar"
        },
    ]

	$scope.index = 0;

	$scope.setIndex = function (val) {
		$scope.index = val;
	}

	$scope.getIndex = function () {
		return ($scope.index);
	}

	$scope.goBack = function () {
		$window.history.back();
	};

	$scope.applicationName = applicationName;

	$scope.no = Array;

	$scope.logout = function () {
		Data.get('logout').then(function (results) {
			Data.toast(results);
			$location.path('login');
		});
	}
})

app.controller('AngularUIController', ['$scope', 'resource', function ($scope, $location, resource) {
	$scope.model = resource.data;
}]);

app.controller('IndexController', function ($scope) {
	$scope.pagetitle = "Beranda";
	$scope.pagetitledesc = "Halaman Awal";
	$scope.color = "gray";
})

app.controller('LoginController', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
	//initially set those objects to null to avoid undefined error
	$scope.login = {};

	$scope.doLogin = function (customer) {
		Data.post('login', {
			customer: customer
		}).then(function (results) {
			Data.toast(results);
			if (results.status == "success") {
				$location.path('home');
			}
		});
	};
});

app.controller('MemberController', function ($scope, $location, $timeout, kategoriService) {
	$scope.pagetitle = "Member";
	$scope.pagetitledesc = "Data Member FansClub Persib Bandung";
	$scope.color = "black";

	$scope.showData = function () {
		memberService.getAll().success(function (data) {
			$scope.member = data;
			$scope.currentPage = 1; //current page
			$scope.entryLimit = "5"; //max no of items to display in a page
			$scope.filteredItems = $scope.kategori.length; //Initially for no filter  
			$scope.totalItems = $scope.kategori.length;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	$scope.filter = function () {
		$timeout(function () {
			$scope.filteredItems = $scope.filtered.length;
		}, 10);
	};
	$scope.sort_by = function (predicate) {
		$scope.predicate = predicate;
		$scope.reverse = !$scope.reverse;
	};

	$scope.reload = function () {
		$location.path('/member');
	};

	$scope.delete = function (data) {
		memberService.deletemember(data.member_id);
		$scope.member.splice($scope.member.indexOf(data), 1);
	};
});

app.controller('DetailMemberController', function ($scope, $location, $routeParams, memberService) {
	$scope.pagetitle = "Member";
	$scope.pagetitledesc = "Data Member FansClub Persib Bandun";
	$scope.color = "black";
	$scope.action = "Detail";

	$scope.showDataId = function () {
		memberService.getId($routeParams.memberId).success(function (data) {
			$scope.member = data;
		});
	};
	$scope.showDataId();

	$scope.delete = function (data) {
		memberService.deletemember(data.member_id);
		$location.path('/member');
	};
})

app.controller('TambahMemberController', function ($scope, $location, memberService, Data) {
	$scope.pagetitle = "Member";
	$scope.pagetitledesc = "Data Member FansClub Persib Bandung";
	$scope.color = "black";
	$scope.action = "Add";

	$scope.member = {};
	$scope.simpan = function () {
		memberService.createmember({
			member_nama: $scope.member.member_nama,
			member_alamat: $scope.member.member_alamat,
			member_telp: $scope.member.member_telp,
			member_tgl_masuk: $scope.member.member_tgl_masuk,
		}).success(function (data) {
			$location.path('/member');
		});
	}
});

app.controller('UbahMemberController', function ($scope, $location, $routeParams, memberService) {
	$scope.pagetitle = "Memberk";
	$scope.pagetitledesc = "Data Member FansClub Persib Bandung";
	$scope.color = "black";
	$scope.action = "Update";

	$scope.showDataId = function () {
		memberService.getId($routeParams.memberId).success(function (data) {
			$scope.member = data;
		});
	};
	$scope.showDataId();

	$scope.edit = function (member_id, member_nama, member_alamat, member_telp, member_tgl_masuk) {
		$scope.member_id = member_id;
		$scope.member_nama = member_nama;
		$scope.member_alamat = member_alamat;
		$scope.member_telp = member_telp;
		$scope.member_tgl_masuk = member_tgl_masuk;
		memberService.updatemember({
			'member_id': member_id,
			'member_nama': member_nama,
			'member_alamat': member_alamat,
			'member_telp': member_telp,
			'member_tgl_masuk': member_tgl_masuk,
		}).then(function (resp) {
			console.log('Success', resp);
			$location.path('/kategori');
		}, function (err) {
			console.error('Error', err);
		});
	}
})

app.controller('BeritaController', function ($scope, $location, $timeout, produkService) {
	$scope.pagetitle = "Berita Terbaru";
	$scope.pagetitledesc = "Informasi Mengenai Berita Terbaru di Persib Bandung";
	$scope.color = "black";

	$scope.showData = function () {
		produkService.getAll().success(function (data) {
			$scope.berita = data;
			$scope.currentPage = 1; //current page
			$scope.entryLimit = "5"; //max no of items to display in a page
			$scope.filteredItems = $scope.berita.length; //Initially for no filter  
			$scope.totalItems = $scope.berita.length;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	$scope.filter = function () {
		$timeout(function () {
			$scope.filteredItems = $scope.filtered.length;
		}, 10);
	};
	$scope.sort_by = function (predicate) {
		$scope.predicate = predicate;
		$scope.reverse = !$scope.reverse;
	};

	$scope.reload = function () {
		$location.path('/berita');
	};

	$scope.delete = function (data) {
		 beritaService.deleteberita(data.berita_id);
		$scope.berita.splice($scope.produk.indexOf(data), 1);
	};
});

app.controller('DetailBeritaController', function ($scope, $location, $routeParams, produkService) {
	$scope.pagetitle = "Berita";
	$scope.pagetitledesc = "Informasi Mengenai Berita Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Detail";

	$scope.showDataId = function () {
		beritaService.getId($routeParams.beritaId).success(function (data) {
			$scope.berita = data;
		});
	};
	$scope.showDataId();

	$scope.delete = function (data) {
		beritaService.deleteberita(data.berita_id);
		$location.path('/berita');
	};
})

app.controller('AddBeritaController', function ($scope, FileUploader, $location, kategoriService, beritakService) {
	$scope.pagetitle = "Berita";
	$scope.pagetitledesc = "Informasi Mengenai Berita Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Add";

	var uploader = $scope.uploader = new FileUploader({
		url: 'http://localhost/kelompok1/frontend/www/img/upload_produk.php'
	});

	uploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/ , options) {
			return this.queue.length < 1;
		}
	});

	// CALLBACKS
	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);


	$scope.showData = function () {
		memberService.getAll().success(function (data) {
			$scope.member = data;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();

	$scope.berita = {};
	$scope.simpan = function () {
		beritaService.createberita({
			
			berita_nama: $scope.berita.berita_nama,
			berita_deskripsi: $scope.berita.berita_deskripsi,
			berita_harga: $scope.berita.berita_harga,
			berita_terjual: $scope.berita.berita_terjual,
			berita_pesan_min: $scope.berita.berita_pesan_min,
			berita_kondisi: $scope.berita.berita_kondisi,
			berita_stock: $scope.berita.berita_stock,
			berita_gambar: $scope.berita.berita_gambar,
		}).success(function (data) {
			$location.path('/berita');
		});
	}
});

app.controller('UpdBeritaController', function ($scope, $location, $routeParams, FileUploader, memberService, beritaService) {
	$scope.pagetitle = "Berita";
	$scope.pagetitledesc = "Informasi Mengenai Berita Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Update";

	var uploader = $scope.uploader = new FileUploader({
		url: 'http://localhost/kelompok1/frontend/www/img/upload_produk.php'
	});

	uploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/ , options) {
			return this.queue.length < 1;
		}
	});

	// CALLBACKS
	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);

	$scope.showDataId = function () {
		beritaService.getId($routeParams.beritaId).success(function (data) {
			$scope.berita = data;

		});
	};
	$scope.showDataId();

	$scope.showData = function () {
		memberService.getAll().success(function (data) {
			$scope.member = data;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();


	$scope.edit = function (berita_id, jadwal_id, berita_deskripsi, member_id) {
		$scope.berita_id = berita_id;
		$scope.jadwal_id = jadwal_id;
		$scope.berita_deskripsi = berita_deskripsi;

		beritaService.updateberita({
			'berita_id': berita_id,
			'jadwal_id': jadwal_id,
			'berita_deskripsi': berita_deskripsi,
			
			
		}).then(function (resp) {
			console.log('Success', resp);
			$location.path('/berita');
		}, function (err) {
			console.error('Error', err);
		});
	}
})

app.controller('JadwalController', function ($scope, $location, $timeout, produkService) {
	$scope.pagetitle = "Jadwal";
	$scope.pagetitledesc = "Informasi Mengenai Berita Terbaru di Persib Bandung";
	$scope.color = "black";

	$scope.showData = function () {
		jadwalService.getAll().success(function (data) {
			$scope.jadwal = data;
			$scope.currentPage = 1; //current page
			$scope.entryLimit = "5"; //max no of items to display in a page
			$scope.filteredItems = $scope.jadwal.length; //Initially for no filter  
			$scope.totalItems = $scope.jadwal.length;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	$scope.filter = function () {
		$timeout(function () {
			$scope.filteredItems = $scope.filtered.length;
		}, 10);
	};
	$scope.sort_by = function (predicate) {
		$scope.predicate = predicate;
		$scope.reverse = !$scope.reverse;
	};

	$scope.reload = function () {
		$location.path('/jadwal');
	};

	$scope.delete = function (data) {
		jadwalService.deletejadwal(data.jadwal_id);
		$scope.jadwal.splice($scope.jadwal.indexOf(data), 1);
	};
});

app.controller('DetailJadwalController', function ($scope, $location, $routeParams, produkService) {
	$scope.pagetitle = "Jadwal";
	$scope.pagetitledesc = "Informasi Mengenai Jadwal Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Detail";

	$scope.showDataId = function () {
		jadwalService.getId($routeParams.jadwalId).success(function (data) {
			$scope.jadwal = data;
		});
	};
	$scope.showDataId();

	$scope.delete = function (data) {
		jadwalService.deletejadwal(data.jadwal_id);
		$location.path('/jadwal');
	};
})

app.controller('AddJadwalController', function ($scope, FileUploader, $location, memberService, beritaService) {
	$scope.pagetitle = "Jadwal";
	$scope.pagetitledesc = "Informasi Mengenai Jadwal Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Add";

	var uploader = $scope.uploader = new FileUploader({
		url: 'http://localhost/kelompok1/frontend/www/img/upload_produk.php'
	});

	uploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/ , options) {
			return this.queue.length < 1;
		}
	});

	// CALLBACKS
	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);


	$scope.showData = function () {
		memberService.getAll().success(function (data) {
			$scope.member = data;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();

	$scope.jadwal = {};
	$scope.simpan = function () {
		jadwalService.createjadwal({
			berita_id: $scope.jadwal.berita_id,
			tgl_tanding: $scope.jadwal.tgl_tanding,
			waktu: $scope.jadwal.waktu,
			lawan_tanding: $scope.jadwal.lawan_tanding,
			lokasi_tanding: $scope.jadwal.lokasi_tanding,
			
		}).success(function (data) {
			$location.path('/jadwal');
		});
	}
});

app.controller('UpdJadwalController', function ($scope, $location, $routeParams, FileUploader, memberService, jadwalService) {
	$scope.pagetitle = "Jadwal";
	$scope.pagetitledesc = "Informasi Mengenai Jadwal Terbaru di Persib Bandung";
	$scope.color = "black";
	$scope.action = "Update";

	var uploader = $scope.uploader = new FileUploader({
		url: 'http://localhost/kelompok1/frontend/www/img/upload_produk.php'
	});

	uploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/ , options) {
			return this.queue.length < 1;
		}
	});

	// CALLBACKS
	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);

	$scope.showDataId = function () {
		jadwalService.getId($routeParams.jadwalId).success(function (data) {
			$scope.jadwal = data;

		});
	};
	$scope.showDataId();

	$scope.showData = function () {
		memberService.getAll().success(function (data) {
			$scope.member = data;
		}).finally(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.showData();


	$scope.edit = function (jadwal_id, tgl_tanding, waktu, lawan_tanding, lokasi_tanding, member_id) {
		$scope.jadwal_id = jadwal_id;
		$scope.tgl_tanding = tgl_tanding;
		$scope.waktu = waktu;
		$scope.lawan_tanding = lawan_tanding;
		$scope.lokasi_tanding = lokasi_tanding;
		$scope.member_id = member_id;
		
		jadwalService.updatejadwal({
			'jadwal_id': jadwal_id,
			'tgl_tanding': tgl_tanding,
			'waktu': waktu,
			'lawan_tanding': lawan_tanding,
			'lokasi_tanding': lokasi_tanding,
			'member_id': member_id,
			
		}).then(function (resp) {
			console.log('Success', resp);
			$location.path('/produk');
		}, function (err) {
			console.error('Error', err);
		});
	}
})



