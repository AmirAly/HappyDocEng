doctorApp.controller('dashboardCtrl', function ($scope, $window) {
    console.log($window.localStorage['authenticationToken']);
    console.log($window.localStorage['userId']);
});