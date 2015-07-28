angular.module('settings-module', [])

.service('SettingsService', function ($q, $http) {
	var parent = this;

	this.get_users = function (user_id) {
		var deferred = $q.defer();
		if (user_id) { user_id = '/' + user_id; } else { user_id = ''; };

		$http({ method:'GET', url:config.users + user_id }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.add_new_user = function (user) {
		var deferred = $q.defer();

		$http({ method:'POST', url:config.users, data:user }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.update_user = function (user, user_id) {
		var deferred = $q.defer();

		$http({ method:'PUT', url:config.users + '/' + user_id, data:user }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.delete_user = function (user_id) {
		var deferred = $q.defer();

		$http({ method:'DELETE', url:config.users + '/' + user_id }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.add_metric_bin = function (bin_data) {
		var deferred = $q.defer();

		$http({ method:'POST', url:config.metric_bins, data:bin_data }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};	

	this.update_metric_bin = function (metric_bin, metric_id) {
		var deferred = $q.defer();

		$http({ method:'PUT', url:config.metric_bins + '/' + metric_id, data:metric_bin }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.delete_metric_bin = function (metric_id) {
		var deferred = $q.defer();

		$http({ method:'DELETE', url:config.metric_bins + '/' + metric_id }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

})

.controller('SettingsController', function ($scope, $state, $stateParams, LoginService, TrendsService, SettingsService) {
	
	$scope.view_tab 		= "Users";
	$scope.metric_bin 		= null;
	$scope.metric_bins 		= null;
	$scope.users 			= null;
	$scope.user_details 	= null;
	$scope.new_user 		= {};
	$scope.new_metric 		= {};
	$scope.roles 			= ['Admin','Analyst','Manager'];
	$scope.user_panel_ids 	= ['panel1', 'panelAnchor1', 'panel2', 'panelAnchor2', 'panel3', 'panelAnchor3'];
	$scope.metric_panel_ids = ['metricPanel1', 'metricPanelAnchor1', 'metricPanel2', 'metricPanelAnchor2', 'metricPanel3', 'metricPanelAnchor3'];

	function init () {
		var login_state = LoginService.isLoggedIn();
		if (login_state == false) {
			$state.go('login');
		};
	};

	$scope.changeTab = function (tab) { 
		$scope.view_tab = tab;
	};

	$scope.get_users = function () {
		SettingsService.get_users().then( function (response) {
			$scope.users = response.data;
		}, function (error) {
			console.log(error);
		});
	};

	$scope.get_user= function (user_id) {
		SettingsService.get_users(user_id).then( function (response) {
			$scope.user_details = response.data;
		}, function (error) {
			console.log(error);
		});
	};

	$scope.get_metric_bins = function () {
		TrendsService.get_metric_bins().then(function (response) {
			$scope.metric_bins = response.data;
		}, function (error) {
			console.log(error);
		});
	};

	$scope.get_metric_bin = function (metric_id) {
		TrendsService.get_metric_bins(metric_id).then( function (response) {
			$scope.metric_bin = response.data;
		}, function (error) {
			console.log(error);
		});
	};

	$scope.add_new_user = function (user) {
		SettingsService.add_new_user(user).then( function (response) {
			alert("User successfully added.");
			$scope.get_users();
			$scope.new_user = {};
		}, function (error) {
			alert("Something went wrong, unable to add new user.");
		});
	};

	$scope.update_user = function (user) {
		var user_id = user._id;
		delete user.createdAt;
		delete user.updatedAt;
		delete user._id;

		SettingsService.update_user(user, user_id).then( function (response) {
			alert('User successfully updated.');
			$scope.get_users();
		}, function (error) {
			alert('Something went wrong, unable to update user.');
		});
	};

	$scope.delete_user = function (user_id) {
		SettingsService.delete_user(user_id).then( function (response) {
			alert('User successfully removed.');
			$scope.get_users();
			$scope.user_details = {};
		}, function (error) {
			alert('Something went wrong, unable to remove user.');
		});
	};

	$scope.add_metric_bin = function (bin_data) {
		SettingsService.add_metric_bin(bin_data).then( function (response) {
			alert('Metric bin successfully added.');
			$scope.new_metric = {};
			$scope.get_metric_bins();
		}, function (error) {
			alert('Something went wrong, unable to add new metric bin.');
		});
	};

	$scope.update_metric_bin = function (metric_bin) {
		delete metric_bin.createdAt;
		delete metric_bin.updatedAt;
		
		SettingsService.update_metric_bin(metric_bin, metric_bin._id).then( function (response) {
			alert('Metric bin successfully updated.');
		}, function (error) {
			alert('Something went wrong, unable to update metric bin.');
		});
	};

	$scope.delete_metric_bin = function (metric_id) {
		SettingsService.delete_metric_bin(metric_id).then( function (response) {
			alert('Metric bin successfully removed.');
			$scope.get_metric_bins();
		}, function (error) {
			alert('Something went wrong, unable to remove metric bin.');
		});
	};

	$scope.select_panel = function (events, settings, panel_ids) {
		var ids = [];
		if (settings == 'metric') {
			ids = panel_ids;
		} else if (settings == 'user') {
			ids = panel_ids;
		};
		
		if (ids) {
			if (events == 'first') {
				set_style(ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]);
			} else if (events == 'second') {
				set_style(ids[2], ids[3], ids[0], ids[1], ids[4], ids[5]);
			} else if (events == 'third') {
				set_style(ids[4], ids[5], ids[2], ids[3], ids[0], ids[1]);
			};
		};
	};

	function set_style (value1, value2, value3, value4, value5, value6) {
		document.getElementById(value1).style.borderRadius = '3px';
		document.getElementById(value1).style.background = '#0069a6';
		document.getElementById(value2).style.color = '#fff';

		document.getElementById(value3).style.background = '';
		document.getElementById(value4).style.color = '';

		document.getElementById(value5).style.background = '';
		document.getElementById(value6).style.color = '';
	};

	init();
	$scope.get_metric_bins();
	$scope.get_users();

})
