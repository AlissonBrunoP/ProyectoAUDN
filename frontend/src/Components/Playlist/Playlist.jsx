import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import options from "../../assets/icons/dots.svg";
import "./Playlist.css";
import Footer from "../Footer/Footer";
import logo from "../../assets/icons/logo-small.svg";
import verified from "../../assets/icons/verified.svg";
import share from "../../assets/icons/share.svg";
import clock from "../../assets/icons/clock.svg";
import copy from "../../assets/icons/copy.svg";
import random from "../../assets/icons/random.svg";
import play from "../../assets/icons/style=default, state=play.svg";
import pause from "../../assets/icons/style=default, state=pause.svg";

function Playlist() {
  const location = useLocation();
  const { songs, playlistName } = location.state;
  const navigate = useNavigate();
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const duration = songs.reduce((total, song) => total + song.duration, 0);
    setTotalDuration(duration);
  }, [songs]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.ceil(duration - hours * 60);
    return `${hours}h${minutes}m`;
  };

  const goBackButton = () => {
    navigate(-1);
  };

  const playClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="playListContainer">
      <nav id="navBarPlayList">
        <button className="goBack" onClick={goBackButton}>
          <img src={arrowLeft} alt="Go back" />
        </button>
        <div className="playlistTitle">
          <p>{playlistName}</p>
          <h3>Play List generada</h3>
        </div>
        <img className="options" src={options} alt="Options" />
      </nav>

      <main id="mainPlayList">
        <div className="imageGrid">
          {songs.slice(0, 4).map((song, index) => (
            <img
              key={song.id}
              src={song.artist_image}
              alt={song.artist_name}
              className={`artistImage ${
                index === 1 ? "top-right" : index === 2 ? "bottom-left" : ""
              }`}
            />
          ))}
        </div>
        <section className="playlistDetails">
          <div className="firstRow">
            <div className="rowLeft">
              <img src={logo} alt="logoAudn" />
              <img src={verified} alt="verified" />
              <img src={share} alt="share" />
            </div>
            <div className="rowRight">
              <p className="duration">{formatDuration(totalDuration)}</p>
              <img src={clock} alt="time" />
            </div>
          </div>
          <div className="secondRow">
            <div className="leftRow">
              <img src={copy} alt="copy" />
              <p>Crear Copia</p>
            </div>
            <div className="rightRow">
              <img src={random} alt="Random" />
              <button
                onClick={playClick}
                className={`playButton ${isPlaying ? "rotate" : ""}`}
              >
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "Pause" : "Play"}
                />
              </button>
            </div>
          </div>
        </section>
        <ul className="listSongs">
          {songs.map((song) => {
            const artistImage = song.artist_image;
            return (
              <li key={song.id}>
                <div className="songContainer">
                  <img
                    src={artistImage}
                    alt={song.artist_name}
                    className="artistImage"
                  />
                  <div className="songDetails">
                    <p className="songName">{song.song_name}</p>
                    <p className="artistName">{song.artist_name}</p>
                  </div>
                  <img src={options} alt="Options" className="songOptions" />
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <section id="footerPlayList">
        <Footer />
      </section>
    </div>
  );
}

export default Playlist;
