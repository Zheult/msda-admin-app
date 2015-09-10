angular.module('msda')
    .constant('ErrorsService_config', {
        api: {
            scheme: 'http',
            host: '192.168.23.65',
            port: 8080,
            path: '/api/ErrorsService/',
            makeUrlForMethod: function (method) {
                return this.scheme + '://' + this.host + ':' + this.port + this.path + method;
            }
        }
    });
