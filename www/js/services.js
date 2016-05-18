angular.module('app.services', [])

.factory('API', ['$http', function ($http) {
    var _url = "http://localhost:8080";
    return {
        name: 'API',
        execute: function (_req,_isAuth) {
            _req.url = _url + _req.url;
            if (_isAuth == true)
                _req.data.Auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWFyNEBtYWlsLmNvbSIsImlhdCI6MTQ2MzU3ODQ0OSwiZXhwIjoxNDYzNjY0ODQ5fQ.gfosLRpvudi5gxHgJ_45fXrYPMKtAVY3QAKX6UMbtNs";
            return $http(_req);
        }
    };
}]);

