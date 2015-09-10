angular.module('msda')
    .controller('ErrorsService_addErrorCtrl', function ($scope, $mdDialog, ErrorsService_error, applicationId) {
        $scope.formData = {};
        $scope.errorText = '';

        $scope.submit = function () {
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                var error = angular.copy($scope.formData);
                ErrorsService_error.add(applicationId, error).then(function () {
                    $scope.formData = {};
                    $scope.errorText = '';
                    $mdDialog.hide(error);
                }, function (response) {
                    $scope.errorText = response.data.message;
                });
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    });
