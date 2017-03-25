var express = require('express');
var app = express();
var Handlebars = require('handlebars');
var fs = require('fs');
var mongoClient = require('mongodb');
var mongoPort = 27017;
var mongoUrl = 'mongodb://localhost:' + mongoPort + '/mydb';
mongoClient.connect(mongoUrl, function(err, db) {//connect to mongo
    if(err === null ) {
        console.log('mongo connected')
             db.createCollection('CV', function(err, collection) {//create collection (if exists - its ok)
                if(err !== null ) {
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
                    experience: {
                        first: 'OS',
                        second: 'procedural programming',
                        third : 'oo programming',
                        fourth : 'functional programming',
                        fifth : 'web programming',
                    },
                    platforms : {
                        first :'Unix, Backtrack5, Windows',
                        second : ' C, Assembler',
                        third :' Java, C++',
                        fourth : 'Erlang, Scala',
                        fifth : ' HTML, Flash, VB, CSS, Javascript'
                    },
                    elementBox1 : {
                        first : {
                            title: 'Javascript',
                            value: '60'
                        },            
                        second : {
                            title: 'HTML/CSS',
                            value: '50'
                        },
                        third : {
                            title: 'Photoshop',
                            value: '75'
                        },
                        fourth : {
                            title: 'Java',
                            value: '60'
                        }
                    },
                    elementBox2 : {
                    first : {
                        title: 'Creativity',
                        value: '60'
                    },            
                    second : {
                        title: 'HTML/CSS',
                        value: '50'
                    },
                    third : {
                        title: 'Photoshop',
                        value: '75'
                    },
                    fourth : {
                        title: 'Java',
                        value: '60'
                    }
                },
                education : {
                    first : 'programming engineer',
                    years : '2015-2017',
                    institute : 'ort singalovsky'
                }
            }
            db.collection('CV',
                          function(err, cv_collection) {//getting the collection
                            cv_collection.count(
                                function(err, count) {//count how many documents are in collection
                                    if(count === 0) {//nothing was inserted
                                        cv_collection.insertOne(insertedProperties,
                                            function(err, response){});//insert new document
                                    }
                                });

                        });    
            
            app.get('/', function (req, res) {//navigating in browser
                db.collection('CV', function(err, cv_collection) {//getting the collection
                    cv_collection.find({}).toArray(function(err, response) {//getting the collection data
                        var html = Handlebars.compile(fs.readFileSync('./index.html', 'utf8'))(
                            response[0]
                        );//putting collection data into html
                        res.send(html);//sending html back to browser
                    })
                })
            })
        }
    })
}
    
    
       


    
});

app.listen(8080, function () {
    console.log('listening on port 8080');
});

app.use('/css', express.static(__dirname + '/css/'));
app.use('/doc', express.static(__dirname + '/doc/'));
app.use('/img', express.static(__dirname + '/img/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/modules', express.static(__dirname + '/node_modules/'));


 


