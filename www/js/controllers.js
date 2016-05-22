angular.module('app.controllers', [])

.controller('loginCtrl', function ($scope, $state, API, $window) {


    $scope.submitForm = function (form) {
        if (form.$valid) {
            console.debug(form.name);
            console.debug(form.password);
            var req = {
                method: 'POST',
                url: '/api/user/login',
                data: { email: form.name, password: form.password }
            }
            API.execute(req, false).then(function (_res) {
                if (_res.data.code == 100) {
                    console.log(_res.data);
                    $window.localStorage['authenticationToken'] = _res.data.token;
                    $window.localStorage['userId'] = _res.data.data._id;
                    $state.go('dashboard');
                }
                else {
                    console.log(_res.data.message);
                }
            });

        }
    }
})

.controller('registerCtrl', function ($scope, $state, API, $window) {

    $scope.submitForm = function (form) {
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
                    $window.localStorage['authenticationToken'] = _res.data.token;
                    $window.localStorage['userId'] = _res.data.data._id;
                    $state.go('dashboard');
                }
                else {
                    console.log(_res.data.message);
                }
            });

        }
    }
})

.controller('dashboardCtrl', function ($scope, $window) {
    console.log($window.localStorage['authenticationToken']);
    console.log($window.localStorage['userId']);
})

.controller('allPatientsCtrl', function ($scope) {

})

.controller('veiwPatientCtrl', function ($scope, $state, $ionicPopup, $ionicModal, $timeout) {
    //remove patient confirmation
    $scope.showDeleteConfirmation = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: '<i class="ion-information-circled"></i> Confirmation',
            template: 'Are you sure you want to Delete this patient?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                $state.go('allPatients');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.showDeleteCardConfirmation = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: '<i class="ion-information-circled"></i> Confirmation',
            template: 'Are you sure you want to Delete this card?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.newPost = function () {
        $ionicModal.fromTemplateUrl('postPopupModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $timeout(function () {
            $scope.modal.show();
        }, 200);
    }

    $scope.hideModal = function () {
        $scope.modal.hide();
    }

    $scope.submitForm = function (form) {
        if (form.$valid) {
            $scope.modal.hide();
        }
    }


    $scope.flip = function (id) {
        angular.element(document.querySelector('#card' + id)).toggleClass('flip');
    }
})

.controller('patientCtrl', function ($scope, $state) {
    $scope.active = 1;
    $scope.setActive = function (type) {
        console.log(type);
        $scope.active = type;
    };
    $scope.isActive = function (type) {
        return type === $scope.active;
    };

    $scope.submitForm = function (form) {
        if (form.$valid) {
            console.log('submit');
            $state.go('veiwPatient');
        }
    }


})

.controller('doctorProfileCtrl', function ($scope, $ionicLoading, $timeout, API, $window) {
    $scope.formData = {};
    //temp fixed data
    $scope.formData.phoneNumber = '02465476587';

    //console.log($window.localStorage['authenticationToken']);
    //console.log($window.localStorage['userId']);

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
            $scope.formData.phoneNumber = _res.data.data.phone;
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
                console.log(_res);
                if (_res.data.code == 100) {
                    console.log(_res.data);
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
})
;