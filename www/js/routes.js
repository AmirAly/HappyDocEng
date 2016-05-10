angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

  .state('allPatients', {
    url: '/allpatients',
    templateUrl: 'templates/allpatients.html',
    controller: 'allPatientsCtrl'
  })

  .state('veiwPatient', {
    url: '/veiwpatient',
    templateUrl: 'templates/veiwpatient.html',
    controller: 'veiwPatientCtrl'
  })

  .state('patient', {
    url: '/patient',
    templateUrl: 'templates/patient.html',
    controller: 'patientCtrl'
  })

  .state('doctorProfile', {
    url: '/doctorProfile',
    templateUrl: 'templates/doctorprofile.html',
    controller: 'doctorProfileCtrl'
  })

$urlRouterProvider.otherwise('/')

  

});