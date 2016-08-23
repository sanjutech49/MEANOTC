//(function () {
  angular.module('logincontroller',[]).controller('logincontroller',
     function ($scope, $location, apiservice) {
            
            $scope.loginMe = function () {
            var reqData = "examid=" + $scope.examid + "&studentid=" + $scope.studentid;
            apiservice.post('login', reqData)
                .then(function (res)
                    {
                if (!res) {
                    alert("Invalid examId or StudentId");
                }
                else {
                sharedResource.qa = res.qa;
                sharedResource.student = res.student;
                sharedResource.studentid = $scope.studentid;
                    localStorage.setItem('exam', JSON.stringify(sharedResource.qa));
                localStorage.setItem('student', JSON.stringify(sharedResource.student));
              //  alert('logged in successfully!');
                $location.path('/exam');
                }
            }
            )}
    
        });
//})();