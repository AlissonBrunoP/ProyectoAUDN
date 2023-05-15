const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userMe = async (req, res) => {
  try {
    const consulta = await knex
      .select("*")
      .from("users")
      .where({ user_name: "ali_bruno" });
    if (consulta.length > 0) {
      let user = consulta[0];

      user.playlists = await knex
        .select(
          "p.name as playlist_name",
          knex.raw("jsonb_agg(DISTINCT a.artist_image) as artist_images")
        )
        .from("playlist as p")
        .join("playlist_songs as ps", "p.id", "=", "ps.playlist_id")
        .join("songs as s", "ps.songs_id", "=", "s.id")
        .join("artist as a", "s.artist_id", "=", "a.id")
        .where({ user_id: user.id_user })
        .groupBy("p.id", "p.name");

      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    //setMessage(error.response.data.error);
  }
};

exports.userRegister = async (req, res) => {
  const { user_name, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);

  try {
    const consulta = await knex
      .select("user_name")
      .from("users")
      .where({ user_name: user_name });
    if (consulta.length > 0) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso" });
    } else {
      const resultado = await knex("users").insert({
        user_name: user_name,
        password: passwordEncrypt,
      });
      res.status(200).json({ message: "El nombre de usuario está disponible" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    setMessage(error.response.data.error);
  }
};

exports.userCheck = async (req, res) => {
  const { user_name } = req.body;

  try {
    const consulta = await knex
      .select("user_name")
      .from("users")
      .where({ user_name: user_name });

    return res.status(200).json({ exists: consulta.length > 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
    setMessage(error.response.data.error);
  }
};
