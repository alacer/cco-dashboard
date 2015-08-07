angular.module('dashboard-module',[])

.service ('DashboardService', function ($q, $http) {
	var parent 	= this;

	this.get_metrics = function(date, page) {
		var deferred = $q.defer();
		var page     = page ||'0';

		$http({method:'GET', url:config.metrics + '?date=' + date + '&page=' + page + '&size=' + data_size }).then( function (response) {
			deferred.resolve(response);
		}, function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};
	
})

.controller ('DashboardController', function ($scope, $state, DashboardService, $stateParams, TrendsService, SessionService, $filter, DTColumnDefBuilder, DTOptionsBuilder) {

	$scope.metric_bins 		= null;
	$scope.total_items  	= null; 
    $scope.num_pages    	= null;
    $scope.limit        	= null;
    $scope.current_page 	= null;
    $scope.init_page    	= $stateParams.page || 1;
	$scope.default_date 	= $stateParams.date || default_date();

	$scope.get_metrics = function(date, page) {
		var new_page = page - 1;
		DashboardService.get_metrics(date, new_page).then(function (response) {
			$scope.metrics 		= response.data.metrics;
			$scope.current_page = response.data.page + 1;
            $scope.num_pages    = response.data.pages;
            $scope.limit        = response.data.size;
            $scope.total_items  = $scope.num_pages * $scope.limit;
			for (var i = 0; i < $scope.metrics.length; i++) {
				var new_bin = get_bins($scope.metrics[i].name, $scope.metric_bins);

				$scope.metrics[i].bin1 	= new_bin.bin1 || 0;
				$scope.metrics[i].bin2 	= new_bin.bin2 || 0;
				$scope.metrics[i].bin3 	= new_bin.bin3 || 0;

				var ok_progress = get_average($scope.metrics[i].inqueue, $scope.metrics[i].ok);
				var c_progress	= get_average($scope.metrics[i].inqueue, $scope.metrics[i].caution);
				var d_progress 	= get_average($scope.metrics[i].inqueue, $scope.metrics[i].danger);

				$scope.metrics[i].ok_progress 	= ok_progress;
				$scope.metrics[i].c_progress 	= c_progress;
				$scope.metrics[i].d_progress 	= d_progress;
			};
		}, function (error) {
			console.log(error);
		});
	};

	$scope.date_filter = function (date) {
		// var new_date = new Date(date);
		// 	new_date.setDate(new_date.getDate()-1);

		var set_date = $filter('date')(date, 'yyyy-MM-dd');
		$state.go('user.dashboard', { date:set_date, page:1 });
	};	

	$scope.get_metric_bins = function () {
		TrendsService.get_metric_bins().then(function (response) {
			$scope.metric_bins = response.data;
			$scope.get_metrics($scope.default_date, $scope.init_page);
		});
	};

	$scope.view_trends = function (metric_name) {
		$state.go('user.trends', { metric:metric_name, page:1 });
	};

	$scope.page_changed = function (pages) {
        $state.go('user.dashboard', { date:$scope.default_date, page:pages });
    };

	function init () {
		var login_state = SessionService.isLoggedIn();
		if (login_state == false) {
			$state.go('login');
		};
	};

	$scope.dtOptions = DTOptionsBuilder
		.newOptions()
		.withDOM('Tft<"top"l>rt<"bottom"ip><"clear">')
		.withOption('paging', false)
		.withOption('filter', false)
		.withOption('info', false)
		.withTableTools("//cdn.datatables.net/tabletools/2.2.2/swf/copy_csv_xls_pdf.swf")
        .withTableToolsButtons([
    		{
				"sExtends": "copy",
				"sButtonText": "Copy",
				"mColumns": [0,1,2,3,4,5,6,8,9]
			},
			{
				"sExtends": "csv",
				"sButtonText": "CSV",
				"mColumns": [0,1,2,3,4,5,6,8,9]
			},
			{
				"sExtends": "pdf",
				"sPdfOrientation": "landscape",
				"sButtonText": "PDF",
				"mColumns": [ 0, 1, 2, 3, 4, 5, 6, 8]
			}
        
        ]);

	$scope.DTColumnDefs = [
        DTColumnDefBuilder.newColumnDef([1, 2, 3, -2, -1]).notSortable(),
        DTColumnDefBuilder.newColumnDef([4, 5, -3]).notVisible()
    ];

	init();
	$scope.get_metric_bins();
})

.directive('datetimez', function() {

    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          element.datetimepicker({
            dateFormat:'dd-mm-yyyy',
           language: 'en',
           pickTime: false,
           startDate: '01-11-2013',      // set a minimum date
           endDate: '01-11-2030'          // set a maximum date
          }).on('changeDate', function(e) {
            ngModelCtrl.$setViewValue(e.date);
            scope.$apply();
            $(".bootstrap-datetimepicker-widget").hide();
          });
        }
    };

})


