const axios = require('axios');
const chalk = require('chalk');

// Map Box API key
const MB_API_KEY =
  '?access_token=pk.eyJ1Ijoic2FpdGVqYW0xMiIsImEiOiJja2p2dHp0dngwN2E2MnVyMXZkNDN0dDVrIn0.AusWH1HrJTR5JrCavUDuTw';
const MB_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
const getGeoCode = (value, callback) => {
  axios
    .get(MB_API_URL + value + '.json' + MB_API_KEY)
    .then((response) => {
      if (response.data.features[0]) {
        const disc = response.data.features[0];
        const coords = disc.center;
        callback({
          coords: `lat=${coords[1]}&lon=${coords[0]}`,
          latitude: coords[1],
          longitude: coords[0],
          location: disc.place_name,
        });
        // const coords = disc && disc.center;
      } else {
        callback({
          coords: `q=${value}`,
          location: value,
        });
      }
      // const disc = response.data.features[0];
      // console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      // callback({
      //   coords: `lat=41.8756&lon=-87.6244`,
      //   latitude: 41.8756,
      //   longitude: -87.6244,
      //   location: 'Chicago',
      // });
    });
};

module.exports = getGeoCode;
