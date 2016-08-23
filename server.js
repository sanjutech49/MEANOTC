//require('rootpath')();
//import http = require('http');
var port = process.env.port || 8024;

var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

var session = require('express-session');

var bodyParser = require('body-parser');

var expressJwt = require('express-jwt');

var config = require('./config.json');

app.use(express.static(__dirname + '/public'));

//app.set('views', __dirname + '/views');
//configuring app to use bodyParser. This will help to fetch the data from post
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
//use jwt auth to secure the api
//app.use('/api', expressJwt({ secret: config.secret }).unless({ path:['/api/users/authenticate','/api/users/register']}));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/admin');

//mongoose.connect('mongodb://blue:Offic3r@107.170.194.19:27017/main');
var db = mongoose.connection;

var qaModel = require("./server/models/qaModel");
var studentModel = require("./server/models/studentModel");
var examanswerModel = require("./server/models/examanswerModel");

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('connected to database');
});

//routes for api call
var router = express.Router();

// Add Headers
app.use(function (req, res, next) {
    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    //request methods you want to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH,DELETE');

    //REQUEST Headers you wish to allow
    res.setHeader('Acess-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Set to true if you need the website to include cookes in the requests sent
    //to the api (e.g. in case you use session)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //Pass to next layer of middleware
    next();
});

//middleware to use for all requests
router.use(function (req, res, next) {
    //do logging
    console.log('new request logged');
    next();
});

//Testing route http://localhost:8024
app.get('/', function (req, res) {
    res.sendfile("./public/index.html");
});

router.get('/', function (req, res) {
    res.json({ message: 'Welcome to our PoC api' });
    // res.sendfile("index.html");
});

//routes
//router.route('/login', require('/controllers/login.controller'));
//router.route('/register', require('./controllers/register.controller'));
//router.route('/app', require('./controllers/app.controller'));
//router.route('/api/users', require('./controllers/api/users.controller'));
io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

router.route('/login').post(function (req, res) {
    var examid = req.body.examid;
    var studentid = req.body.studentid;

    var qaData;
    var studentData;
    var rowItem;
    qaModel.findOne({ 'examid': examid }, function (err, data) {
        if (err)
            res.send(err);
        qaData = data;

        studentModel.findOne({ 'students.studentid': studentid }, function (err, data) {
            if (err)
                res.send(err);
            studentData = data;

            if ((qaData != null) && (studentData != null)) {
                rowItem = { "qa": qaData, "student": studentData };
                res.json(rowItem);
                io.emit('loggedin', { examid: examid, studentid: studentid });
            } else {
                console.log('Error has occured. please contact to server administrator');
                res.send(null);
            }
        });
    });
});

router.route('/saveAnswer').post(function (req, res) {
    var examid = req.body.examid;
    var studentid = req.body.studentid;
    var questionid = req.body.questionid;
    var answer = req.body.answer;

    var qaData;
    var studentData;
    var rowItem;
    examanswerModel.findOneAndRemove({ 'examid': examid, 'studentid': studentid, 'answers.questionid': questionid }, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        }
    });

    var qanswer = examanswerModel();
    qanswer.examid = examid;
    qanswer.studentid = studentid;
    qanswer.answers = [{ questionid: questionid, answer: answer }];

    qanswer.save(function (error) {
        if (error)
            res.send(error);
    });
    io.emit('answer', { examid: examid, studentid: studentid, questionid: questionid, answer: answer });
    res.json(qanswer);
});

router.route('/getQAStudents').post(function (req, res) {
    var examid = req.body.examid;

    // var studentid = req.body.studentid;
    var qaData;
    var studentData;
    var rowItem;
    qaModel.findOne({ 'examid': examid }, function (err, data) {
        if (err)
            res.send(err);
        qaData = data;

        studentModel.findOne({ 'examid': examid }, function (err, data) {
            if (err)
                res.send(err);
            studentData = data;

            if ((qaData != null) && (studentData != null)) {
                rowItem = { "qa": qaData, "student": studentData };
                res.json(rowItem);
            } else {
                console.log('Error has occured. please contact to server administrator');
                res.send(null);
            }
        });
    });
});

//Register routes
app.use('/api', router);

//app.listen(port);
server.listen(port);

console.log('Server up - on port' + port);
//exports = module.exports = app;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
//var schema = mongoose.Schema({
//    name: 'string'
//});
//var cat = db.model('Cat', schema);
//var kitty = new cat({ name: 'Zildjian' });
//kitty.save(function (err) {
//    if (err)
//        console.log('meow');
//});
//# sourceMappingURL=server.js.map
