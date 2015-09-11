angular.module('msda')
    .controller('ErrorsService_tableCtrl', function ($scope, $http, $mdDialog, ErrorsService_application) {
        var $parent = $scope.$parent;

        $scope.application = {};
        $scope.errorList = [];

        $scope.showEmpty = false;

        angular.extend($scope, {
            selected: [],

            query: {
                filter: '',
                order: 'codeToUpper',
                page: 1,
                limit: 10
            },

            filter: {
                show: false,
                options: {}
            },

            removeFilter: function () {
                this.query.filter = '';
                this.filter.show = false;

                if (this.filter.form.$dirty) {
                    this.filter.form.$setPristine();
                }
            },

            addApplication: function (event) {
                $mdDialog.show({
                    //clickOutsideToClose: true,
                    controller: 'ErrorsService_addApplicationCtrl',
                    focusOnOpen: false,
                    targetEvent: event,
                    templateUrl: 'app/modules/errors-service/views/partials/table-add-application-dialog.html'
                }).then(function () {
                    $parent.getApplications();
                });
            },

            addError: function (event) {
                $mdDialog.show({
                    //clickOutsideToClose: true,
                    controller: 'ErrorsService_addErrorCtrl',
                    focusOnOpen: false,
                    targetEvent: event,
                    templateUrl: 'app/modules/errors-service/views/partials/table-add-error-dialog.html',
                    locals: {
                        applicationId: $scope.application.applicationId
                    }
                }).then(function () {
                    $parent.$broadcast('loadErrors');
                });
            },

            deleteError: function (event) {
                $mdDialog.show({
                    //clickOutsideToClose: true,
                    controller: 'ErrorsService_deleteErrorCtrl',
                    focusOnOpen: false,
                    targetEvent: event,
                    templateUrl: 'app/modules/errors-service/views/partials/table-delete-error-dialog.html',
                    locals: {
                        applicationId: $scope.application.applicationId,
                        errorList: $scope.selected
                    }
                }).then(function () {
                    $parent.$broadcast('loadErrors');
                });
            }
        });

        var loadErrors = function () {
            if (typeof $scope.application.applicationId === 'undefined') return;

            $scope.deferred = ErrorsService_application.$get($scope.application.applicationId)
                .then(function (response) {
                    var errorList = angular.copy(response.data.errorsList); // TODO: errorsList -> errorList
                    if (errorList.length) {
                        errorList.sort(function (a, b) {
                            return a.code - b.code;
                        });
                        var filter = $scope.query.filter;
                        if (filter) {
                            var match = function (input, value) {
                                if (typeof input === 'object') {
                                    var keys = Object.keys(input), found = false;
                                    for (var i = 0, len = keys.length; i < len && !found; i++)
                                        found = match(input[keys[i]], value);
                                    return found;
                                } else if (typeof input !== 'string') {
                                    input = input.toString();
                                }
                                return input.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                            };
                            errorList = errorList.filter(function (value) {
                                return match(value, filter);
                            });
                        }
                        if (errorList.length && $scope.showEmpty) {
                            var tmpArray = Array.apply(null, {
                                length: parseInt(errorList[errorList.length - 1].code) + 1
                            }).map(function (value, index) {
                                return {code: ('000' + index).slice(-3), keyword: '', message: ''};
                            });
                            angular.forEach(errorList, function (value) {
                                tmpArray[parseInt(value.code)] = value;
                            });
                            errorList = tmpArray;
                        }
                    }
                    $scope.errorList = errorList;
                });
        };

        $scope.$watch(function (scope) {
            return scope.showEmpty;
        }, loadErrors);

        $scope.$watch(function (scope) {
            return scope.application;
        }, loadErrors);

        $scope.$parent.$on('loadErrors', loadErrors);

        var oldFilter;
        setInterval(function () {
            var filter = $scope.query.filter;
            if (filter != oldFilter) {
                loadErrors();
                oldFilter = filter;
            }
        }, 500);

        $scope.$watchCollection(function () {
            return $scope.$parent.applications;
        }, function (applications) {
            if (applications.length) {
                $scope.application = applications[0];
            }
        });

        // Initialization
        (function () {
        })();
    });
