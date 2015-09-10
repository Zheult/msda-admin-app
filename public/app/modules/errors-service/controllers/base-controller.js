angular.module('msda')
    .controller('ErrorsService_baseCtrl', function ($scope, $http, ErrorsService_application) {
        $scope.applications = [];

        $scope.getApplications = function () {
            ErrorsService_application.query().then(function (response) {
                $scope.applications = response.data;
            });
        };

        // Initialization
        (function () {
            $scope.getApplications();
        })();
    });
