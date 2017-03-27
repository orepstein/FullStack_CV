
var fs = require('fs');
var bodyParser = require('body-parser');

var mongoClient = require('mongodb');//related to mongop
var mongoPort = 27017;
var mongoUrl = 'mongodb://localhost:' + mongoPort + '/mydb';

var express = require('express');//related to node and express
var app = express();
app.listen(8080, function () {
    console.log('listening on port 8080');
});
app.use(bodyParser.urlencoded({extended: false}))//so the server can get the request body
app.use(bodyParser.json())

app.use('/css', express.static(__dirname + '/css/'));//to specify the path to files we need
app.use('/doc', express.static(__dirname + '/doc/'));
app.use('/img', express.static(__dirname + '/img/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/html', express.static(__dirname + '/html/'));
app.use('/modules', express.static(__dirname + '/node_modules/'));

mongoClient.connect(mongoUrl, function (err, db) {//connect to mongo
    if (err === null) {
        console.log('mongo connected')
        db.createCollection('CV', function (err, collection) {//create collection (if exists - its ok)
            if (err !== null) {
                console.log('error create CV collection');
            }
            else {//declaring what to insert
                var insertedProperties = {
                    headerProperties: {
                        firstName: 'Or',
                        lastName: 'Epstein',
                        course: 'FullStack',
                        project: 'CV Project'
                    },
                    about: {
                        phone: '052-6637515',
                        area: 'Israel',
                        email: 'orepstein2@gmail.com'
                    },
                    socialNetworks: {
                        facebook: 'https://www.facebook.com/or.epstein1?fref=ts',
                        mailto: 'mailto:orepstein2@gmail.com',
                    },
                    experience: [
                        'OS',
                        'procedural programming',
                        'oo programming',
                        'functional programming',
                        'web programming',
                    ],
                    platforms: [
                        'Unix, Backtrack5, Windows',
                        ' C, Assembler',
                        ' Java, C++',
                        'Erlang, Scala',
                        ' HTML, Flash, VB, CSS, Javascript'
                    ],
                    elementBox1: [
                        {
                            title: 'Javascript',
                            value: '60'
                        },
                        {
                            title: 'HTML/CSS',
                            value: '50'
                        },
                        {
                            title: 'Photoshop',
                            value: '75'
                        },
                        {
                            title: 'Java',
                            value: '60'
                        }
                    ],
                    elementBox2: [
                        {
                            title: 'Creativity',
                            value: '60'
                        },
                        {
                            title: 'HTML/CSS',
                            value: '50'
                        },
                        {
                            title: 'Photoshop',
                            value: '75'
                        },
                        {
                            title: 'Java',
                            value: '60'
                        }
                    ],
                    education: {
                        degree: 'programming engineer',
                        years: '2015-2017',
                        institute: 'ort singalovsky'
                    }
                };
                db.collection('CV', function (err, cv_collection) {//getting the collection
                    cv_collection.count(
                        function (err, count) {//count how many documents are in collection
                            if (count === 0) {//nothing was inserted
                                cv_collection.insertOne(insertedProperties,
                                    function (err, response) {
                                    });//insert new document
                            }
                        });
                });
                //until here not related to browser, next is only after browser is loading

                //declaring 3 entries (urls) that we will use later
                app.get('/', function (req, res) {//navigating in browser
                    getCV(function (cv) {
                        res.sendFile(__dirname + '/index.html');//sending html back to browser without all the parameters
                    });
                });
                app.get('/cv', function (req, res) {//on contoller initialization, angular calls this route/url
                    getCV(function (cv) {
                        res.send(cv);//send response to client
                    });
                });
                app.put('/editCv', function (req, res) {//here we are using the body parser to get the reuqest body
                    db.collection('CV', function (err, cv_collection) {//getting the collection
                        cv_collection.update({}, {
                            $set: {
                                headerProperties: req.body.headerProperties,
                                about: req.body.about,
                                socialNetworks: req.body.socialNetworks,
                                experience: req.body.experience,
                                platforms: req.body.platforms,
                                elementBox1: req.body.elementBox1,
                                elementBox2: req.body.elementBox2,
                                education: req.body.education
                            }
                        }, function (err, response) {//after finished to update the document
                            getCV(function (cv) {//getting the document
                                res.send(cv);//send back to client the document
                            })
                        });
                    });
                });

                function getCV(callback) {//this function gets us the document in mongo
                    db.collection('CV', function (err, cv_collection) {//getting the collection
                        cv_collection.find({}).toArray(function (err, response) {//getting the collection data (document)
                            callback(response[0]);
                        });
                    });
                }

            }
        });
    }


});



 


