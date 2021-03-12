const axios = require('axios');
const chalk = require('chalk');

//Open Weather Map API key
const OWM_API_KEY = `&appid=545f13f841ca097329540c0a1d23bb0e`;

// const city = `chicago`;
// const lat = '41.85';
// const lon = '-87.65';

const OWM_API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const units = '&units=metric';

const getWeather = ({ coords, location, latitude, longitude }, callback) => {
  axios
    .get(OWM_API_URL + coords + units + OWM_API_KEY)
    .then((response) => {
      const data = response.data;
      callback(data);
    })
    .catch((error) => {
      let data = {
        error:
          'Error. Something Went Wrong. please check the entry is valid or Connection to OpenWeatherMap API is valid',
      };
      callback(data);
    });
};

module.exports = getWeather;
