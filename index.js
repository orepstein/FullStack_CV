var express = require('express');
var app = express();
var fs = require('fs');
var mongoClient = require('mongodb');
var bodyParser = require('body-parser');
var mongoPort = 27017;
var mongoUrl = 'mongodb://localhost:' + mongoPort + '/mydb';
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
                }
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

                app.get('/', function (req, res) {//navigating in browser
                    getCV(function (cv) {
                        // var html = Handlebars.compile(fs.readFileSync('./index.html', 'utf8'))(
                        //     cv
                        // );//putting collection data into html
                        res.sendFile(__dirname + '/index.html');//sending html back to browser
                    });
                });
                app.get('/cv', function (req, res) {
                    getCV(function (cv) {
                        res.send(cv);
                    });
                });
                app.put('/editCv', function (req, res) {
                    db.collection('CV', function (err, cv_collection) {//getting the collection
                        cv_collection.update({},{
                            $set: {
                                headerProperties: req.body.headerProperties,
                                about:req.body.about,
                                socialNetworks:req.body.socialNetworks,
                                experience: req.body.experience,
                                platforms: req.body.platforms,
                                elementBox1: req.body.elementBox1,
                                elementBox2: req.body.elementBox2,
                                education: req.body.education
                            }
                        }, function(err, response) {
                            getCV(function(cv){
                                res.send(cv);
                            })
                        });
                    });
                });

                function getCV(callback) {
                    db.collection('CV', function (err, cv_collection) {//getting the collection
                        cv_collection.find({}).toArray(function (err, response) {//getting the collection data
                            callback(response[0]);
                        });
                    });
                }

            }
        });
    }


});

app.listen(8080, function () {
    console.log('listening on port 8080');
});
app.use(bodyParser.urlencoded({extended: false}))
app
    .use(bodyParser.json())

app.use('/css', express.static(__dirname + '/css/'));
app.use('/doc', express.static(__dirname + '/doc/'));
app.use('/img', express.static(__dirname + '/img/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/html', express.static(__dirname + '/html/'));
app.use('/modules', express.static(__dirname + '/node_modules/'));


 


