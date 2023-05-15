import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./Profile.css";
import settingImg from "../../assets/icons/settings.svg";
import Footer from "../Footer/Footer";

function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/me")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  const goToSettings = () => {
    navigate(`/settings`, { replace: true });
  };

  return (
    <>
      <div id="gradientProfile"></div>
      <div id="divImgProfile">
        <img src={userData.profile_img} alt="" id="imgUser" />
        <button id="btnSettings" onClick={goToSettings}>
          <img src={settingImg} alt="Imagen Configuración" />
        </button>
      </div>
      <div id="infoUser">
        <h3>{userData.name}</h3>
        <p>@{userData.user_name}</p>
      </div>
      <div id="divBtnPlaylist">
        <div>
          <p>
            <strong>Mis Playlists</strong>
          </p>
        </div>
        <div id="horizontalLineProfile"></div>
        <div>
          <button>Crear Playlist</button>
        </div>
      </div>
      <ul className="ulPlaylist">
        {userData.playlists != null &&
          userData.playlists.map((playlist, index) => (
            <li className="eachLi" key={index}>
              <div className="imgArtistPlaylist">
                <img src={playlist.artist_images[0]} />
              </div>
              <p>
                <strong>{playlist.playlist_name}</strong>
              </p>
              <span>{userData.user_name}</span>
            </li>
          ))}
      </ul>
      <section id="footerContainerProfile">
        <Footer/>
      </section>
    </>
  );
}
export default Profile;
