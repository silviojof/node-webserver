const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to Append to File');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomePage: 'Welcome to the Home'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to fulfille this promise'
  });
});

// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// });

// Heroku will tell which port to use
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
