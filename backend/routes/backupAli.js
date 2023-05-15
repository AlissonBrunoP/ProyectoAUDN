const express = require("express");
const {
  ShowOcasion,
  ShowFeeling,
  ShowWeather,
  userCheck,
  userMe,
  userRegister,
} = require("../controllers/audnControllers");
const routes = express.Router();

routes.get("/ocasion", ShowOcasion);
routes.get("/feeling", ShowFeeling);
routes.get("/weather", ShowWeather);

routes.get("/me", userMe);

routes.post("/register", userRegister);
routes.post("/check", userCheck);

module.exports = routes;
