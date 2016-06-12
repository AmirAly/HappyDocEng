doctorApp.controller('patientCtrl', function ($scope, $state) {
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


});