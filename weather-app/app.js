const chalk = require('chalk');
const request = require("postman-request");

const url_1 = 'https://api.weatherstack.com/current?access_key=1c1f2ec6d6f19ff44179510251d3d09e&query=Hargeisa';

request({ url: url_1, json: true }, (error, response) => {
  if(error){
    console.log(chalk.red("Couldn't connect to weather service!"));
  } else if (response.body.error) {
    console.log(chalk.red(response.body.error.info));
  } else {
    console.log(`It is currently ${response.body.current.temperature} degrees out in ${response.body.location.name}. It feels like ${response.body.current.feelslike} degrees out.`);
  }
})

const url =
  "https://api.mapbox.com/search/geocode/v6/forward?q=Mogadishu&limit=1&access_token=pk.eyJ1IjoiaXNtYWlsLWFtaW4iLCJhIjoiY204MjdpNXN4MWh5eDJqczZhaXhhN3RraSJ9.Da5fA9flOk3fo7DeNzwmQg";

request({ url: url, json: true }, (error, response) => {
  if(error) {
    console.log(chalk.red('Cannot access geocoding services'));
  } else if (response.body.features[0] === undefined) {
    console.log(chalk.red('Cannot find specified location'));
  } else {
    console.log(
      chalk.blue
      (response.body.features[0].properties.coordinates.longitude +
        " and " +
        response.body.features[0].properties.coordinates.latitude +
        " are the coordinates for " +
        response.body.features[0].properties.name)
    );
  }
});
