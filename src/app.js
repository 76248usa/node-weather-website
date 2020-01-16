const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup directory to serve
app.use(express.static(publicDirectoryPath));

//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Elsabe Crous"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Elsabe"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("Please provide a search term");
  } else {
    res.send({
      products: []
    });
  }
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You  must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Elsabe"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Page 404",
    errorMessage: "Help article not found",
    name: "Elsabe"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Page 404",
    errorMessage: "Page 404, page not found",
    name: "Elsabe"
  });
});

app.listen(port, () => {
  console.log("The server is running on port" + port);
});
