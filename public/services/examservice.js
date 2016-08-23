(function () { 

    examservice = function ()
    {
this.createQA = function (res) {
var qa = {
i : res.student,
time : {
hour: 0,
min: 0,
sec: 0
},
score: 0,
questions: []
};
            
for (var i = 0; i < res.questions.lengh; i++) {
                var questionid = res.questions[i].questionid;
                var questionname = res.questions[i].questionname;
                qa.questions[i] = {
                    id: i + 1,
                    questionid : res.questions[i].questionid,
                    questionname : res.questions[i].questionname,
                    questionoptions : res.questions[i].questionoptions,
                    optiontype : res.questions[i].optiontype,
                    isAnswered : false,
                    A1 : res.questions[i].A1,
                    A2 : res.questions[i].A2,
                    A3 : res.questions[i].A3,
                    A4 : res.questions[i].A4,
                    correctanswer : res.questions[i].correctanswer,
                    answer : null

                };
            }

        }
    }

})();