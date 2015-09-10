angular.module('msda')
    .factory('Menu', function ($location, $rootScope) {
        var sections = [],
            homeSection = {
                name: 'სამართავი დაფა',
                type: 'link',
                url: '/',
                className: 'home-link'
            };

        sections.push(homeSection, {
            name: 'სერვისები',
            type: 'toggle',
            pages: [{
                name: 'შეცდომები',
                type: 'link',
                url: '/services/errors'
            }, {
                name: 'ენები',
                type: 'link',
                url: '/services/languages'
            }]
        });

        var self;

        $rootScope.$on('$locationChangeSuccess', function () {
            var path = $location.path();
            var matchPage = function (section, page) {
                if (path == page.url) {
                    self.openSection(section);
                    self.selectPage(section, page);
                }
            };
            if (path == '/') {
                matchPage(homeSection, homeSection);
            } else {
                var matchPageDeep = function (section) {
                    typeof section.pages !== 'undefined' &&
                    section.pages.forEach(function (page) {
                        matchPage(section, page);
                    });
                };
                sections.forEach(function (section) {
                    if (section.type === 'link') {
                        matchPage(section, section);
                    } else if (section.children) {
                        section.children.forEach(matchPageDeep);
                    } else {
                        matchPageDeep(section);
                    }
                });
            }
        });

        return self = {
            sections: sections,

            openSection: function (section) {
                self.openedSection = section;
            },

            toggleOpenSection: function (section) {
                self.openedSection = (self.isSectionOpened(section) ? null : section);
            },

            isSectionOpened: function (section) {
                return self.openedSection === section;
            },

            selectPage: function (section, page) {
                self.currentSection = section;
                self.currentPage = page;
            },

            isPageSelected: function (page) {
                return self.currentPage == page;
            }
        };
    });
