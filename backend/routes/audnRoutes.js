const express = require("express");
const { ShowOcasion, ShowFeeling, ShowWeather } = require("../controllers/audnControllers");
const routes = express.Router();

routes.get("/ocasion", ShowOcasion);
routes.get("/feeling", ShowFeeling);
routes.get("/weather", ShowWeather);



module.exports = routes;