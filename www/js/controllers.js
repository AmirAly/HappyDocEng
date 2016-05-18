angular.module('app.controllers', [])

.controller('loginCtrl', function ($scope, $state, API) {
    var req = {
        method: 'PUT',
        url: '/api/user/updateprofile?_id=57347b162cd13790103d7b07',
        data: { email: 'amr@alo.co' }
    }
    API.execute(req,true).then(function (_res) {
        console.log(_res);
    });
    $scope.submitForm = function (form) {
        if (form.$valid) {
            $state.go('dashboard');
        }
    }
})

.controller('registerCtrl', function ($scope, $state) {
    $scope.submitForm = function (form) {
        if (form.$valid) {
            $state.go('dashboard');
        }
    }
})

.controller('dashboardCtrl', function ($scope) {

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

.controller('doctorProfileCtrl', function ($scope, $ionicLoading, $timeout) {
    $scope.phoneNumber = '02465476587';
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
            console.log('submit');
        }
    }

    $scope.submitFormPhone = function (form) {
        if (form.$valid) {
            console.log('submit');
        }
    }
})
;