
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        
        $routeProvider.when('/', {
            templateUrl: '/views/login.html',
            controller: 'logincontroller'
        });
        $routeProvider.when('/exam', {
            templateUrl: '/views/exam.html',
            controller: 'examcontroller'
        });
        $routeProvider.when('/result', {
            templateUrl: '/views/result.html',
            controller: 'resultcontroller'
        });
        $routeProvider.otherwise('/', {
            redirectTo: '/'
        });
        
      //  $locationProvider.html5Mode(true);
    }]);

