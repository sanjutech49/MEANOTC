angular.module('apiservice',[]).service("apiservice", ["$http","$q",  function($http, $q)
{
        $http.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded; charset=UTF-8";

        this.post = function (method, query) {
            var def = $q.defer(),
                url = "http://localhost:8024/api" + "/" + method;
            
            $http.post(url, query).then(function (res) {
                def.resolve(res.data);
            },
            function (err) {
                console.log(err);
            });
            return def.promise
        };

}]);