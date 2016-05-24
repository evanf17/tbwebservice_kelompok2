'use strict';

// Directives
var app = angular.module('App.routes', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/pages/login.html',
			controller: 'LoginController',
			title: 'Login',
			role: '0'
		})
		.when('/home', {
			templateUrl: 'views/pages/dashboard.html',
			controller: 'IndexController',
			title: 'Dashboard'
		})
		.when('/login', {
			templateUrl: 'views/pages/login.html',
			controller: 'LoginController',
			title: 'Login'
		})
		.when('/kategori', {
			templateUrl: 'views/pages/kategori/kategori.html',
			controller: 'KategoriController',
			title: 'Kategori Produk'
		})
		.when('/kategori/detailkategori/:kategoriId', {
			templateUrl: 'views/pages/kategori/detailkategori.html',
			controller: 'DetailKategoriController',
			title: 'Detail Kategori Produk'
		})
		.when('/kategori/addkategori', {
			templateUrl: 'views/pages/kategori/addkategori.html',
			controller: 'AddKategoriController',
			title: 'Add Kategori Produk'
		})
		.when('/kategori/updatekategori/:kategoriId', {
			templateUrl: 'views/pages/kategori/updatekategori.html',
			controller: 'UpdKategoriController',
			title: 'Update Kategori Produk'
		})
		.when('/produk', {
			templateUrl: 'views/pages/produk/produk.html',
			controller: 'ProdukController',
			title: 'Produk'
		})
		.when('/produk/detailproduk/:produkId', {
			templateUrl: 'views/pages/produk/detailproduk.html',
			controller: 'DetailProdukController',
			title: 'Detail Produk'
		})
		.when('/produk/addproduk', {
			templateUrl: 'views/pages/produk/addproduk.html',
			controller: 'AddProdukController',
			title: 'Add Produk'
		})
		.when('/produk/updateproduk/:produkId', {
			templateUrl: 'views/pages/produk/updateproduk.html',
			controller: 'UpdProdukController',
			title: 'Update Produk'
		})
		.when('/toko/:tokoId', {
			templateUrl: 'views/pages/toko/updatetoko.html',
			controller: 'UpdTokoController',
			title: 'Update Toko'
		})
		.when('/user', {
			templateUrl: 'views/pages/user/user.html',
			controller: 'UserController',
			title: 'User'
		})
		.when('/user/detailuser/:userId', {
			templateUrl: 'views/pages/user/detailuser.html',
			controller: 'DetailUserController',
			title: 'Detail User'
		})
		.when('/pembelian', {
			templateUrl: 'views/pages/pembelian/pembelian.html',
			controller: 'PembelianController',
			title: 'Pembelian'
		})
		.when('/pembelian/detailpembelian/:pembelianId', {
			templateUrl: 'views/pages/pembelian/detailpembelian.html',
			controller: 'DetailPembelianController',
			title: 'Detail Pembelian'
		})
		.when('/customer', {
			templateUrl: 'views/pages/customer/customer.html',
			controller: 'CustomerController',
			title: 'Customer'
		})
		.when('/customer/detailcustomer/:customerId', {
			templateUrl: 'views/pages/customer/detailcustomer.html',
			controller: 'DetailCustomerController',
			title: 'Detail Customer'
		})
		.otherwise({
			redirectTo: '/'
		});
})