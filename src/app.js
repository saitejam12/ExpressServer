const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const getGeoCode = require('../public/js/geocode');
const getWeather = require('../public/js/weather');
//Directory Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Handlebars Config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Node - Express Server',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App',
    name: 'About Page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather App',
    name: 'Help Page',
  });
});

app.get('/forecast', (req, resp) => {
  if (!req.query.address) {
    return resp.send({
      error: 'No address provided',
    });
  }
  getGeoCode(req.query.address, (nates) => {
    getWeather(nates, (data) => {
      if (!data.error) {
        resp.send({
          location: nates.location,
          latitude: nates.latitude,
          longitude: nates.longitude,
          temperature: data.main.temp,
          forecast: data.weather[0].description,
        });
      } else {
        resp.send({
          error: data.error,
        });
      }
    });
  });
  // getGeoCode(req.query.address, (nates) => {
  //   getWeather(nates, (data) => {
  //     resp.send({
  //       title: 'Forecast',
  //       name: 'The current forecast of',
  //       forecast: `Its ${data.main.temp} degrees Centigrade in ${data.name} and has ${data.weather[0].description}y sky`,
  //       location: nates.location,
  //       address: req.query.address,
  //     });
  //   });
  // });
});

app.get('/help/*', (req, res) => {
  res.render('notfound', {
    title: 'Help Article Not Found',
    errorMessage: 'The helper resource you are requesting is not available.',
  });
});
app.get('/*', (req, res) => {
  res.render('notfound', {
    title: '404 Page Not Found',
    errorMessage: 'The resource you are requesting is not available.',
  });
});

app.listen(3000, () => {
  console.log('server started on PORT:3000');
});
