const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.ShowOcasion = async (req, res) => {
  try {
    const ocasion = await knex
      .select("*")
      .from("tags")
      .where({ type: "Ocasión" });
    res.status(200).json({ ocasion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.ShowFeeling = async (req, res) => {
  try {
    const feeling = await knex
      .select("*")
      .from("tags")
      .where({ type: "Sentimiento" });
    res.status(200).json({ feeling });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.ShowWeather = async (req, res) => {
  try {
    const weather = await knex
      .select("*")
      .from("tags")
      .where({ type: "Clima" });
    res.status(200).json({ weather });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

