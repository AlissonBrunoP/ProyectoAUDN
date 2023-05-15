import React, { useState, useEffect } from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./MusicaContextual.css";
import { useNavigate } from "react-router-dom";
import ModalMC from "./Modal/ModalMC";
import Transition from "../Transition/Transition";

function MusicaContextual() {
  const [ocasion, setOcasion] = useState([]);
  const [feels, setFeels] = useState([]);
  const [climate, setClimate] = useState([]);
  const [genre, setGenre] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectFeelsOpen, setIsSelectFeelsOpen] = useState(false);
  const [isSelectWeatherOpen, setIsSelectWeatherOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notModal, setNotModal] = useState(false);
  const [selectedOcasion, setSelectedOcasion] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const activity = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/ocasion",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setOcasion(data.ocasion);
      } else {
        console.log("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const feeling = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/feeling",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFeels(data.feeling);
      } else {
        console.log("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const weather = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setClimate(data.weather);
      } else {
        console.log("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const musicalGenre = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/genre",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setGenre(data.genre);
      } else {
        console.log("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    musicalGenre();
  }, []);

  const arrowSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const ocasionChange = (event) => {
    setSelectedOcasion(event.target.value);
  };

  const arrowSelectFeels = () => {
    setIsSelectFeelsOpen(!isSelectFeelsOpen);
  };

  const feelingChange = (event) => {
    setSelectedFeeling(event.target.value);
  };

  const arrowSelectWeather = () => {
    setIsSelectWeatherOpen(!isSelectWeatherOpen);
  };

  const weatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const selectClass = `selectDropdown ${
    isSelectOpen ? "upArrow" : "downArrow"
  }`;

  const selectClassFeeling = `selectDropdown ${
    isSelectFeelsOpen ? "upArrow" : "downArrow"
  }`;

  const selectClassWeather = `selectDropdown ${
    isSelectWeatherOpen ? "upArrow" : "downArrow"
  }`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const notShowAgain = () => {
    setNotModal(true);
    closeModal();
  };

  const isGenreClick = (genre) => {
    console.log(genre);
    if (selectedGenres.includes(genre)) {
      return null;
    } else {
      setSelectedGenres([...selectedGenres, genre.id]);
    }
    console.log(selectedGenres);
  };

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);

  const checkDisabledButton = () => {
    if (
      selectedOcasion !== "" ||
      selectedFeeling !== "" ||
      selectedWeather !== ""
    ) {
      if (selectedGenres.length > 0) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    checkDisabledButton();
  }, [selectedOcasion, selectedFeeling, selectedWeather, selectedGenres]);

  const songsByGenre = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      selectedGenres: selectedGenres, //aca va como valor el array con los id de los artistas
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/songsByGenre",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        return data.songs;
      } else {
        console.log("Ha ocurrido un error inesperado. Intente nuevamente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePlaylist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      playlist: {
        name: "Generada de Música Contextual",
        user_id: 1,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/createPlaylist",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        return { id: data.playlist[0], name: "Generada de Música Contextual" };
      } else {
        console.log("Ha ocurrido un error inesperado. Intente nuevamente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const insertPlayListSong = async () => {
    const playlist = await generatePlaylist();
    const songs = await songsByGenre();

    const playlistSongData = {
      playlistSong: {
        playlist_id: playlist.id,
        songs_ids: songs.map((song) => song.id),
      },
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(playlistSongData),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/createPlaylistSong",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Se han insertado todos los datos necesarios en la BD");
      } else {
        console.log("Ha ocurrido un error inesperado. Intente nuevamente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPlayList = async () => {
    setIsLoading(true);
    const songs = await songsByGenre();
    console.log(songs);
    const playlist = await generatePlaylist();
    const playlistsong = await insertPlayListSong();
    navigate("/playlist", { state: { songs, playlistName: playlist.name } });
  };

  return (
    <>
      {isLoading ? (
        <Transition />
      ) : (
        <div>
          <div>
            <ModalMC
              showModal={showModal}
              closeModal={closeModal}
              notShowAgain={notShowAgain}
            />
          </div>
          <nav id="navBarContextMusic">
            <button className="goBack" onClick={goBack}>
              <img src={arrowLeft} alt="Go Back" />
            </button>
            <h3>Música Contextual</h3>
          </nav>
          <section className="selectsContextMusic">
            <label>¿Cuál es la ocasión?</label>
            <div className="selector">
              <select
                className={selectClass}
                onClick={() => {
                  arrowSelect();
                  activity();
                }}
                onChange={ocasionChange}
              >
                <option value="" disabled selected hidden>
                  Actividad
                </option>
                {ocasion.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <label>¿Cómo te sientes?</label>
            <select
              className={selectClassFeeling}
              onClick={() => {
                arrowSelectFeels();
                feeling();
              }}
              onChange={feelingChange}
            >
              <option value="" disabled selected hidden>
                Estado de ánimo
              </option>
              {feels.map((info) => (
                <option key={info.id} value={info.name}>
                  {info.name}
                </option>
              ))}
            </select>
            <label>¿Cómo está el clima?</label>
            <select
              className={selectClassWeather}
              onClick={() => {
                arrowSelectWeather();
                weather();
              }}
              onChange={weatherChange}
            >
              <option value="" disabled selected hidden>
                Clima
              </option>
              {climate.map((data) => (
                <option key={data.id} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </section>
          <section className="genre">
            <h4>Selecciona hasta 3 géneros:</h4>
            <div>
              {genre.map((genre) => (
                <button
                  className={
                    selectedGenres.includes(genre.id)
                      ? "genreButtonClicked"
                      : "genreButton"
                  }
                  onClick={() => isGenreClick(genre)}
                  key={genre.id}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <button
              className={` ${
                disabledButton ? "buttonCreateDisabled" : "buttonCreate"
              }`}
              disabled={disabledButton}
              onClick={createPlayList}
            >
              Crear Playlist
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default MusicaContextual;
