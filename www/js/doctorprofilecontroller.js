doctorApp.controller('doctorProfileCtrl', function ($scope,$rootScope, $ionicLoading, $timeout, API, $window) {
    $scope.formData = {};
    //temp fixed data
    $scope.formData.phoneNumber = '02465476587';
    $scope.formData.wrongPassword = false;

    //load profile data
    var req = {
        method: 'GET',
        url: '/api/user/getprofile?_id=' + $window.localStorage['userId'],
        data: {},
    }
    API.execute(req, true).then(function (_res) {
        console.log(_res);
        if (_res.data.code == 100) {
            console.log(_res.data);
            $scope.formData.name = _res.data.data.name;
            $scope.formData.email = _res.data.data.email;
            $scope.formData.password = "";
            if (_res.data.data.phone) {
                $scope.formData.phoneNumber = _res.data.data.phone;
            }
            
        }

    });




    //Show a backdrop for one second
    $scope.action = function () {
        $ionicLoading.show({
            scope: $scope,
            templateUrl: 'templates/smsloader.html',
            animation: 'slide-in-up'
        });

        $timeout(function () {
            $ionicLoading.hide();
        }, 5000);
    };

    $scope.submitFormData = function (form) {
        $scope.formData.wrongPassword = false;
        if (form.$valid) {
            console.log($scope.formData.name);
            console.log($scope.formData.email);
            console.log($scope.formData.password);

            // for update profile 
            var req = {
                method: 'PUT',
                url: '/api/user/updateprofile?_id=' + $window.localStorage['userId'],
                data: { email: $scope.formData.email, name: $scope.formData.name, password: $scope.formData.password }
            }
            API.execute(req, true).then(function (_res) {
                if (_res.data.code == 100) {
                    console.log(_res.data);
                    $rootScope.userName = _res.data.data.name;
                    $window.localStorage['userName'] = _res.data.data.name;
                }
                else if (_res.data.code == 1) {
                    // wrong password
                    console.log(_res.data.message);
                    $scope.formData.wrongPassword = true;
                }
                else {
                    console.log(_res.data.message);
                }

            });
        }
    }

    $scope.submitFormPhone = function (form) {
        if (form.$valid) {
            console.log('submit');
        }
    }
});