var app = angular.module('mypoc', ['ngRoute','appRoutes','logincontroller','examcontroller','apiservice']);

// configuration
//app.config(routeConfig);
//app.constant('config', config);

//service
//app.service('apiservice', apiservice);

//contollers

//app.controller('login.Controller', logincontroller);

// init
app.run(function ($rootScope, $location) {
    
    // shortcuts
    sharedResource = $rootScope;
    //a = angular;
 
    //c = console;
    //c.l = c.log;
    
    //// services
    //rs.location = $location;
 
});


