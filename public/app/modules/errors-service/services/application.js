angular.module('msda')
    .factory('ErrorsService_application', function ($http, ErrorsService_config) {
        return {
            query: function () {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Applications'),
                    requestConfig = {params: {}};

                return $http.get(requestUrl, requestConfig);
            },

            get: function (applicationId) {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Applications/' + applicationId),
                    requestConfig = {params: {}};

                return $http.get(requestUrl, requestConfig);
            },

            add: function (application) {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Applications'),
                    requestData = angular.copy(application);

                return $http.post(requestUrl, requestData);
            }
        };
    });
