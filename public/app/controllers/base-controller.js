angular.module('msda')
    .controller('baseCtrl', function ($rootScope, $scope, $mdSidenav, $timeout, Menu) {
        var self = this;

        $scope.menu = Menu;
        $scope.openMenu = function () {
            $timeout(function () {
                $mdSidenav('left').open();
            });
        };
        $scope.closeMenu = function () {
            $timeout(function () {
                $mdSidenav('left').close();
            });
        };

        var mainContentArea = document.querySelector("[role='main']");

        $scope.focusMainContent = function ($event) {
            // Prevent skip link from redirecting
            if ($event) {
                $event.preventDefault();
            }
            $timeout(function () {
                mainContentArea.focus();
            }, 90);
        };

        self.autoFocusContent = false;

        $rootScope.$on('$locationChangeSuccess', function () {
            $scope.closeMenu();

            if (self.autoFocusContent) {
                $scope.focusMainContent();
                self.autoFocusContent = false;
            }
        });

        $scope.isSectionOpen = function (section) {
            var isSectionSelectedDeep = function (section) {
                var selected = false;
                if (section.children) {
                    var children = section.children;
                    for (var i = 0, len = children.length; i < len && !selected; i++) {
                        selected = Menu.isSectionOpen(children[i]);
                    }
                }
                return selected;
            };

            return Menu.isSectionOpen(section) || isSectionSelectedDeep(section);
        };

        // menuLink
        self.isSelected = function (page) {
            return Menu.isPageSelected(page);
        };
        // menuToggle
        self.isOpen = function (section) {
            return Menu.isSectionOpened(section);
        };
        self.toggleOpen = function (section) {
            return Menu.toggleOpenSection(section);
        };
    });
