angular.module('msda')
    .controller('ErrorsService_addApplicationCtrl', function ($scope, $mdDialog, ErrorsService_application) {
        $scope.formData = {};
        $scope.errorText = '';

        $scope.submit = function () {
            $scope.form.$setSubmitted();

            if ($scope.form.$valid) {
                var application = angular.extend({}, $scope.formData, {errorList: []});

                ErrorsService_application.$add(application)
                    .then(function () {
                        $scope.formData = {};
                        $scope.errorText = '';
                        $mdDialog.hide(application);
                    }, function (response) {
                        $scope.errorText = response.data.message;
                    });
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    });
