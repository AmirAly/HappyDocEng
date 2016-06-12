doctorApp.controller('registerCtrl', function ($scope, $state,$rootScope, API, $window) {
    $scope.formData = {};

    $scope.formData.existEmail = false;

    $scope.submitForm = function (form) {
        $scope.formData.existEmail = false;
        if (form.$valid) {
            console.debug(form.name);
            console.debug(form.password);
            var req = {
                method: 'POST',
                url: '/api/user/register',
                data: { email: form.name, password: form.password }
            }
            API.execute(req, false).then(function (_res) {
                if (_res.data.code == 100) {
                    console.log(_res.data);
                    // registerd user has no name yet ,only register 
                    $window.localStorage['authenticationToken'] = _res.data.token;
                    $window.localStorage['userId'] = _res.data.data._id;
                    $window.localStorage['userImg'] = _res.data.data.img;

                    $rootScope.userName = _res.data.data.name;
                    $window.localStorage['userName'] = _res.data.data.name;

                    $state.go('dashboard');
                }
                else if (_res.data.code == 0) {
                    console.log(_res.data.message);
                    $scope.formData.existEmail = true;
                }
                else {
                    console.log(_res.data.message);
                }
            });

        }
    }
});