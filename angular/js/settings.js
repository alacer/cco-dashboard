angular.module('settings-module', [])

.controller('SettingsController', function ($scope, $state, LoginService) {

	function init () {
		var login_state = LoginService.isLoggedIn();
		if (login_state == false) {
			$state.go('login');
		};
	};

	$scope.view_tab = "Users";
		$scope.changeTab = function (tab) { 
		$scope.view_tab = tab;
	};

	init();
	
})
