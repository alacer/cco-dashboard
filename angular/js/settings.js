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

	this.activities = function () {
		var deferred = $q.defer();

		$http({ method:'GET', url:config.logs }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

})

.controller('SettingsController', function ($scope, $state, $stateParams, SessionService, TrendsService, SettingsService) {
	
	$scope.view_tab 		= "Users";
	$scope.date 			= new Date();

	$scope.user 			= null;
	$scope.metric_bin 		= null;
	$scope.metric_bins 		= null;
	$scope.users 			= null;
	$scope.user_details 	= null;
	$scope.logs 			= null;

	$scope.new_user 		= {};
	$scope.new_metric 		= {};
	
	$scope.roles 			= ['Admin','Analyst','Manager'];
	$scope.user_panel_ids 	= ['panel1', 'panelAnchor1', 'panel2', 'panelAnchor2', 'panel3', 'panelAnchor3'];
	$scope.metric_panel_ids = ['metricPanel1', 'metricPanelAnchor1', 'metricPanel2', 'metricPanelAnchor2', 'metricPanel3', 'metricPanelAnchor3'];

	function init () {
		$scope.user = SessionService.get_user_data();
		var login_state = SessionService.isLoggedIn();
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
			console.log($scope.metric_bins);
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
			$scope.users.push(user);
			$scope.new_user = {};
			actions = 'Add User';
			details = 'New User Added: ' + user.firstName + ' ' + user.lastName;
			log = set_log($scope.user, details, actions, 'Success');

			$scope.log_activity(log);
		}, function (error) {
			alert("Something went wrong, unable to add new user.");
			actions = 'Add User';
			details = 'Add New User: ' + user.firstName + ' ' + user.lastName;
			log 	= set_log($scope.user, details, actions, 'Failure');

			$scope.log_activity(log);
		});
	};

	$scope.update_user = function (user) {
		SettingsService.update_user(user, user._id).then( function (response) {
			alert('User successfully updated.');
			$scope.get_users();
			actions = 'Update User';
			details = 'Updated User: ' + user.firstName + ' ' + user.lastName;
			log = set_log($scope.user, details, actions, 'Success');

			$scope.log_activity(log);
		}, function (error) {
			alert('Something went wrong, unable to update user.');
			actions = 'Update User';
			details = 'Update User: ' + user.firstName + ' ' + user.lastName;
			log = set_log($scope.user, details, actions, 'Failure');

			$scope.log_activity(log);
		});
	};

	$scope.delete_user = function (user) {
		SettingsService.delete_user(user._id).then( function (response) {
			alert('User successfully removed.');
			$scope.user_details = {};
			actions = 'Delete User';
			details = 'Deleted User: ' + user.firstName + ' ' + user.lastName;
			log = set_log($scope.user, details, actions, 'Success');

			$scope.log_activity(log);
			$scope.splice_data(user, 'user');
		}, function (error) {
			alert('Something went wrong, unable to remove user.');
			actions = 'Delete User';
			details = 'Delete User: ' + user.firstName + ' ' + user.lastName;
			log = set_log($scope.user, details, actions, 'Failure');

			$scope.log_activity(log);
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

	$scope.activities = function () {
		SettingsService.activities().then( function (response) {
			$scope.logs = response.data;
		}, function (error) {
			console.log(error);
		});
	};

	$scope.log_activity = function (log) {
		SessionService.logs(log);
		log.createdAt = $scope.date;
		$scope.logs.push(log);
	};

	$scope.splice_data = function (data, type) {
		if (type == 'user') {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.users[i].emailAddress == data.emailAddress) {
					$scope.users.splice(i, 1);
				};
			};
		} else if (type == 'metric') {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.metric_bins[i].metric == data.metric) {
					$scope.metric_bins.splice(i, 1);
				};
			};
		};
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
	$scope.activities();

})
