
angular.module('examcontroller', []).controller('examcontroller',
 function ($scope, $location, apiservice) {
    
    
    $scope.isDisabled = false;
    
    $scope.selectedAnswer = null;
    
    $scope.A1 = "A1";
    $scope.A2 = "A2";
    $scope.A3 = "Ä3";
    $scope.A4 = "A4";
    
   
    
    $scope.start = function () {
        
        if (sharedResource.qa == undefined)
            $location.path('/login');
        else {
            $scope.question = sharedResource.qa.questions[0];
            $scope.totalQuestions = sharedResource.qa.questions.length;
        }
       

    };
    
    $scope.start();
    
    $scope.next = function () {
        $scope.selectedAnswer = null;
        var currQ = $scope.question.questionid;
        if (currQ < sharedResource.qa.questions.length)
            $scope.question = sharedResource.qa.questions[currQ];
     
    }
    
    $scope.previous = function () {
        $scope.selectedAnswer = null;
        var currQ = $scope.question.questionid;
        if (currQ > 1 && currQ <= sharedResource.qa.questions.length)
            $scope.question = sharedResource.qa.questions[currQ - 2];
    }
    
    $scope.finish = function () {
        alert('finish');
        var reqData = "examid=" + $scope.examid + "&studentid=" + $scope.studentid;
    }
    
    $scope.saveAnswer = function (answer) {

        var q = sharedResource.qa;
        var student = sharedResource.student;
        var reqData = "examid=" + q.examid + "&studentid=" + sharedResource.studentid + "&questionid=" + $scope.question.questionid + "&answer=" + answer;
        
        apiservice.post("saveAnswer", reqData)
         .then(function (res) {
            if (!res) {
                alert("Invalid examId or StudentId");
            }
            else {
                var response = res;
            }

        });
    }
});