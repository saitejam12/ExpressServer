const OWM_API_KEY = `&appid=545f13f841ca097329540c0a1d23bb0e`;

const OWM_API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const units = '&units=metric';

// fetch(OWM_API_URL + 'q=c' + units + OWM_API_KEY)
//   .then((res) => {
//     res.json().then((data) => {
//       console.log(data);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const weatherForm = document.querySelector('form');
const inp = document.querySelector('input');
const outputOne = document.querySelector('#output1');
const outputTwo = document.querySelector('#output2');

outputOne.textContent = 'weather here';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loc = inp.value;
  console.log(loc);
  fetch('http://localhost:3000/forecast?address=' + loc).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        outputOne.textContent = 'Something died on the backend';
        outputTwo.textContent = data.error;
      } else {
        outputOne.textContent = `Its ${data.temperature} \xB0 C, with ${data.forecast} in ${data.location}`;
        outputTwo.textContent = `latitude: ${data.latitude}, longitude: ${data.longitude}`;
      }
    });
  });
});
