angular.module('msda')
    .factory('ErrorsService_error', function ($http, ErrorsService_config) {
        return {
            //$query: function (applicationId) {
            //    var requestUrl = ErrorsService_config.api.makeUrlFor('applications/' + applicationId + '/errors');
            //
            //    return $http.get(requestUrl);
            //},

            $add: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications/' + applicationId + '/errors'),
                    requestData = {error: error};

                return $http.post(requestUrl, requestData);
            },

            $update: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications/' + applicationId + '/errors'),
                    requestData = {error: error};

                return $http.put(requestUrl, requestData);
            },

            $delete: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications/' + applicationId + '/errors'),
                    requestConfig = {params: {code: error.code}};

                return $http.delete(requestUrl, requestConfig);
            }
        };
    })
;
