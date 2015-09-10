angular.module('msda')
    .controller('ErrorsService_removeErrorCtrl', function ($scope, $mdDialog, ErrorsService_error, applicationId, errorList) {
        $scope.errorText = '';

        $scope.submit = function () {
            for (var i = 0, len = errorList.length; i < len; i++) {
                var error = errorList[i];
                error.keyword && ErrorsService_error.remove(applicationId, error)
                    .then(function () {
                        $scope.errorText = '';
                    }, function (response) {
                        $scope.errorText = response.data.message;
                    });
            }
            !$scope.errorText && $mdDialog.hide(errorList);
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    })
;
