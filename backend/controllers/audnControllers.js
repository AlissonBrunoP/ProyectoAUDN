const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.ShowOcasion = async (req, res) => {
    try {
        const ocasion = await knex.select("*").from("tags").where({ type: "Ocasión" })
        res.status(200).json({ ocasion });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.ShowFeeling = async (req, res) => {
    try {
        const feeling = await knex.select("*").from("tags").where({ type: "Sentimiento" })
        res.status(200).json({ feeling });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.ShowWeather = async (req, res) => {
    try {
        const weather = await knex.select("*").from("tags").where({ type: "Clima" })
        res.status(200).json({ weather });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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