angular.module('msda')
    .directive('menuLink', function () {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'app/directives/menu-link/partials/template.html',
            link: function (scope, element) {
                var controller = element.parent().controller();

                scope.isSelected = function () {
                    return controller.isSelected(scope.section);
                };

                scope.focusSection = function () {
                    // Set flag to be used later when
                    // $locationChangeSuccess calls openPage()
                    controller.autoFocusContent = true;
                };
            }
        };
    });
