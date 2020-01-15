const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e2ba819f45a7ef031a9499fd33d122d8/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to get forecast", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " There is currently " +
          body.currently.precipProbability +
          "% chance of rain." +
          " Current temperature is: " +
          body.currently.temperature +
          " F"
      );
      console.log(body);
    }
  });
};

module.exports = forecast;
