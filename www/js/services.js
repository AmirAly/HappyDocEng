angular.module('app.services', [])

.factory('DoctorsFactory', ['$http', function ($http) {
    return {
        name: 'Doctors Factory',
        getDoctors: function (callback) {
            $http.get('http://localhost:8080/doctors').success(function (data) {
                // prepare data here
                callback(data);
            });
        }
    };
}])

.service('BlankService', [function(){

}])

;

