const express = require('express');
const hbs = require('hbs');
const fs = require('fs');;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');

app.set('view engine','hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log(error);
        }
    })
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('changeToUpperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to Web page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        error_message : 'Error from bad request'
    });
});

app.listen(3000, () => {
    console.log('server setup on port 3000');
});
