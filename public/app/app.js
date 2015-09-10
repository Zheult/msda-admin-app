angular.module('msda', [
    'ui.router',
    'ngMaterial',
    'md.data.table',
    'sprintf'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/views/home.html',
                        controller: function () {
                        }
                    }
                }
            })

            .state('services', {
                url: '/services'
            }).state('services.errors', {
                url: '/errors',
                views: {
                    '@': {
                        templateUrl: 'app/modules/errors-service/views/template.html',
                        controller: 'ErrorsService_baseCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });
