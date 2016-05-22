angular.module('app.services', [])

.factory('API', ['$http', '$window', function ($http, $window) {
    var _url = "http://localhost:8080";
    var headers = { 'authentication': $window.localStorage['authenticationToken'] };
    return {
        name: 'API',
        execute: function (_req, _isAuth) {
            _req.url = _url + _req.url;
            _req.headers = headers;
            //if (_isAuth == true) {
            //    console.log(_req);
            //    console.log($window.localStorage['authenticationToken']);
            //    _req.data.Auth = $window.localStorage['authenticationToken'];
            //}
            return $http(_req);
        }
    };
}]);

