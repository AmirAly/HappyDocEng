doctorApp.controller('veiwPatientCtrl', function ($scope, $state, $ionicPopup, $ionicModal, $timeout) {
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
});