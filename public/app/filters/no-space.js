angular.module('msda')
    .filter('noSpace', function () {
        return function (input) {
            return input ? input.replace(/\s/g, '') : '';
        };
    });
