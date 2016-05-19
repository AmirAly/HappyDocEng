angular.module('app.services', [])

.factory('API', ['$http', '$window', function ($http, $window) {
    var _url = "http://localhost:8080";
    return {
        name: 'API',
        execute: function (_req, _isAuth) {
            _req.url = _url + _req.url;
            if (_isAuth == true) {
                console.log(_req);
                console.log($window.localStorage['authenticationToken']);
                _req.data.Auth = $window.localStorage['authenticationToken'];
            }
            console.log(_req);
            return $http(_req);
        }
    };
}]);

