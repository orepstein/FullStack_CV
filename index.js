var express = require('express');
var app = express();
var Handlebars = require('handlebars');
var fs = require('fs');
app.listen(8080, function () {
    console.log('listening on port 8080');
});

app.use('/css', express.static(__dirname + '/css/'));
app.use('/doc', express.static(__dirname + '/doc/'));
app.use('/img', express.static(__dirname + '/img/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/modules', express.static(__dirname + '/node_modules/'));

app.get('/', function (req, res) {
    var html = Handlebars.compile(fs.readFileSync('./index.html', 'utf8'))(
        {
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
                second: 'blah'
            }
        }
    );
    res.send(html);
});

