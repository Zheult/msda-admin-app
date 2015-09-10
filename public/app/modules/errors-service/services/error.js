angular.module('msda')
    .factory('ErrorsService_error', function ($http, ErrorsService_config) {
        return {
            add: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Errors'),
                    requestData = {applicationId: applicationId, error: error};

                return $http.post(requestUrl, requestData);
            },

            update: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Errors'),
                    requestData = {applicationId: applicationId, error: error};

                return $http.put(requestUrl, requestData);
            },

            remove: function (applicationId, error) {
                var requestUrl = ErrorsService_config.api.makeUrlForMethod('Errors/' + applicationId + '/' + error.code),
                    requestConfig = {params: {}};

                return $http.delete(requestUrl, requestConfig);
            }

            //removeMany: function (applicationId, errorList) {
            //    var codeList = errorList.map(function (error) {
            //        return error.code;
            //    });
            //    var requestUrl = ErrorsService_config.api.makeUrlForMethod('Errors/' + applicationId),
            //        requestConfig = {params: {codeList: JSON.stringify(codeList)}};
            //
            //    return $http.delete(requestUrl, requestConfig);
            //}
        };
    });
