var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var examAnswerSchema = new Schema(
    {
        examid: Number,
        studentid: Number,
        answers: [{ questionid: Number, answer: String }]
    }, { collection : 'examanswers' }, { database: 'admin' }
);

module.exports = mongoose.model('examanswerModel', examAnswerSchema);