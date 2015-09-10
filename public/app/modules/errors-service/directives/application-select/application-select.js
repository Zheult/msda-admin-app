angular.module('msda')
    .directive('esApplicationSelect', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/modules/errors-service/directives/application-select/partials/template.html',
            replace: true,
            link: function (scope, element) {
                var select = angular.element(element);
                select.select2();
                scope.$watchCollection(function (scope) {
                    return scope.$parent.applications;
                }, function () {
                    $timeout(function () {
                        select.select2('destroy')
                            .select2();
                    });
                });
            }
        };
    });
