angular.module('msda')
    .factory('LanguagesService_language', function ($http, LanguagesService_config) {
        return {
            $query: function () {
                var requestUrl = LanguagesService_config.api.makeUrlFor('languages'),
                    requestConfig = {params: {}};

                return $http.get(requestUrl, requestConfig);
            },

            $get: function (id) {
                var requestUrl = LanguagesService_config.api.makeUrlFor('languages/' + id),
                    requestConfig = {params: {}};

                return $http.get(requestUrl, requestConfig);
            },

            $save: function (language) {
                var request = {
                    method: 'POST',
                    url: LanguagesService_config.api.makeUrlFor('languages'),
                    data: language
                };

                typeof language._id !== 'undefined' && language._id &&
                angular.extend(request, {method: 'PUT', url: request.url + '/' + language._id});

                return $http(request);
            },

            $delete: function (language) {
                var requestUrl = LanguagesService_config.api.makeUrlFor('languages/' + language._id),
                    requestConfig = {params: {}};

                return $http.delete(requestUrl, requestConfig);
            }
        };
    });
