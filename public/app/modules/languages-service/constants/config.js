angular.module('msda')
    .constant('LanguagesService_config', {
        api: {
            scheme: 'http',
            host: '192.168.23.65',
            port: 8080,
            path: '/api/languages-service/',
            makeUrlFor: function (input) {
                return this.scheme + '://' + this.host + ':' + this.port + this.path + input;
            }
        }
    });
