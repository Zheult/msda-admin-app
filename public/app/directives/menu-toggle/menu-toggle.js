angular.module('msda')
    .directive('menuToggle', function ($timeout) {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'app/directives/menu-toggle/partials/template.html',
            link: function (scope, element) {
                var controller = element.parent().controller();

                scope.isOpen = function () {
                    return controller.isOpen(scope.section);
                };

                scope.toggle = function () {
                    controller.toggleOpen(scope.section);
                };

                scope.$watch(function () {
                    return controller.isOpen(scope.section);
                }, function (isOpen) {
                    var ul = element.find('ul');
                    var targetHeight = isOpen ? getTargetHeight() : 0;

                    $timeout(function () {
                        ul.css({
                            height: targetHeight + 'px'
                        });
                    }, 0, false);

                    function getTargetHeight() {
                        var targetHeight;
                        ul.addClass('no-transition')
                            .css('height', '');
                        targetHeight = ul.prop('clientHeight');
                        ul.css('height', 0)
                            .removeClass('no-transition');
                        return targetHeight;
                    }
                });
            }
        };
    });
