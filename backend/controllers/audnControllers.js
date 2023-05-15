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


/* -------------------------------------------- */
exports.GetArtist = async (req, res) => {
    try {       
        const artist = await knex.select("*").from("artist")
        res.status(200).json({ artist });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.GetSongs = async (req, res) => {
    try {    
        const songs = await knex.select("*").from("songs")
        res.status(200).json({ songs });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
/* --------------------Codigo de Virginia---------------------------------- */
exports.getAllSongsByArtist = async (req, res) => {
    const artistArray = req.body.selectedArtist;
    try {
        const songs = await knex
            .select(
                "songs.name as song_name",
                "songs.artist_id",
                "artist.name as artist_name",
                "artist.artist_image"
            )
            .from("songs")
            .whereIn("artist_id", artistArray)
            .join("artist", "songs.artist_id", "artist.id")
            .whereNotNull("artist.artist_image")
            .groupBy("songs.name", "songs.artist_id", "artist.name", "artist.artist_image")
        res.status(200).json({ songs });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/* ---------------------------------------------- */

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
