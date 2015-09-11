angular.module('msda')
    .constant('ErrorsService_config', {
        api: {
            scheme: 'http',
            host: '192.168.23.65',
            port: 8080,
            path: '/api/errors-service/',
            makeUrlFor: function (input) {
                return this.scheme + '://' + this.host + ':' + this.port + this.path + input;
            }
        }
    });
