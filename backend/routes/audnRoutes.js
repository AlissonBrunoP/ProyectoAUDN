const express = require("express");
const { ShowOcasion, ShowFeeling, ShowWeather, MusicalGenres, getAllSongsByGenre, createPlaylist, createPlaylistSong, top10, songsSearch } = require("../controllers/audnControllers");
const routes = express.Router();

routes.get("/ocasion", ShowOcasion);
routes.get("/feeling", ShowFeeling);
routes.get("/weather", ShowWeather);
routes.get("/genre", MusicalGenres);
routes.post("/songsByGenre", getAllSongsByGenre);
routes.post("/createPlaylist", createPlaylist);
routes.post("/createPlaylistSong", createPlaylistSong);
routes.get("/top10", top10);
routes.get("/search", songsSearch)




module.exports = routes;