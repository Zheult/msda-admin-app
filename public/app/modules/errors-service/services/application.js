angular.module('msda')
    .factory('ErrorsService_application', function ($http, ErrorsService_config) {
        return {
            $query: function () {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications');

                return $http.get(requestUrl);
            },

            $get: function (applicationId) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications/' + applicationId);

                return $http.get(requestUrl);
            },

            $add: function (application) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications');

                return $http.post(requestUrl, application);
            },

            $update: function (application) {
                var requestUrl = ErrorsService_config.api.makeUrlFor('applications');

                return $http.put(requestUrl, application);
            }
        };
    });
