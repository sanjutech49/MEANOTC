var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var qaSchema = new Schema(
    {
        examid: Number,
        examduration: Number,        
        questions: [{ questionid: Number, questionname: String, questionoptions: String, optiontype : String, A1 : String, A2: String, A3: String, A4: String, correctanswer: String }]
        
    }, {collection :'qas'}, {database:'admin'}
);

module.exports = mongoose.model('qaModel', qaSchema);
