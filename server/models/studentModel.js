var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema = new Schema(
    {
        examid: Number,
        students: [{ studentid: Number, studentname: String, imageno: String }]
    }, { collection : 'students' }, { database: 'admin' }
);

module.exports = mongoose.model('studentModel', studentSchema);
