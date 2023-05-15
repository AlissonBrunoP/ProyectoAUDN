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

exports.MusicalGenres = async (req, res) => {
    try {
        const genre = await knex.select("*").from("musical_genre")
        res.status(200).json({ genre });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllSongsByGenre = async (req, res) => {
    const genres = req.body.selectedGenres;
    try {
        const songs = await knex
            .select(
                "songs.name as song_name",
                "songs.artist_id",
                "artist.name as artist_name",
                "artist.artist_image",
                "songs.duration"
            )
            .from("songs")
            .whereIn("genre_id", genres)
            .join("artist", "songs.artist_id", "artist.id")
            .whereNotNull("artist.artist_image")
            .groupBy("songs.name", "songs.artist_id", "artist.name", "artist.artist_image", "songs.duration")
        res.status(200).json({ songs });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.createPlaylist = async (req, res) => {
    const data = req.body.playlist;
    try {
        const playlist = await knex("playlist").insert({
            name: data.name,
            user_id: data.user_id,
        });
        res.status(200).json({ playlist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createPlaylistSong = async (req, res) => {
    const data = req.body.playlistSong;
    const songsIds = data.songs_ids;
    try {
        for (const songId of songsIds) {
            const playlistSong = await knex("playlist_songs").insert({
                playlist_id: data.playlist_id,
                songs_id: songId,
            });
        }
        res.status(200).json({ message: "Playlist songs created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.top10 = async (req, res) => {
    try {
        const top = await knex.select("*").from("top10")
        res.status(200).json({ top });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.songsSearch = async (req, res) => {
    const { term } = req.query;
    try {
        const result = await knex
            .select(
                'songs.name as song_name',
                'songs.artist_id',
                'artist.name as artist_name',
                'artist.artist_image',
                'album.name as album_name',
                'album.album_image',
                'songs.duration'
            )
            .from('songs')
            .join('artist', 'songs.artist_id', 'artist.id')
            .join('album', 'songs.album_id', 'album.id')
            .where('songs.name', 'like', `%${term}%`)
            .orWhere('artist.name', 'like', `%${term}%`)
            .orWhere('album.name', 'like', `%${term}%`)
            .whereNotNull('artist.artist_image')
            .groupBy('songs.name', 'songs.artist_id', 'artist.name', 'artist.artist_image', 'album.name', 'album.album_image', 'songs.duration')
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


