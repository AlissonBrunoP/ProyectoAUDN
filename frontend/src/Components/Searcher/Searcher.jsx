import React, { useEffect, useState } from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import options from "../../assets/icons/dots.svg";
import search from "../../assets/icons/search.svg";
import micro from "../../assets/icons/micro.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Searcher.css";

function Searcher() {
  const navigate = useNavigate();
  const [top, setTop] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const searchButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const backButton = () => {
    navigate(-1);
  };

  const top10 = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/top10",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        setTop(data.top);
        console.log(data);
      } else {
        console.log("Ha ocurrido un error del lado del cliente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    top10();
  }, []);

  const searchSong = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/search?term=${searchTerm}`,
        requestOptions
      );
      if (response.ok) {
        const info = await response.json();
        setSearchResults(info.result);
        console.log(info);
      } else {
        alert("No se han encontrado canciones con su criterio de búsqueda");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      searchSong();
    }
  }, [searchTerm]);

  const searchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const enterKeyDown = (event) => {
    if (event.key === "Enter") {
      searchSong();
    }
  };

  return (
    <div className="searcherContainer">
      <nav id="navBarSearcher">
        <button className="goBack" onClick={backButton}>
          <img src={arrowLeft} alt="Go back" />
        </button>
        <div className="titleSearcher">
          <h3>Buscador</h3>
        </div>
        <img className="options" src={options} alt="Options" />
      </nav>
      <section className="inputContainer">
        <span className="leftImageContainer">
          <img src={search} alt="Search" />
        </span>
        <input
          type="text"
          placeholder="Buscar"
          className="inputField"
          value={searchTerm}
          onChange={searchTermChange}
          onKeyDown={enterKeyDown}
        />
        <span className="rightImageContainer">
          <img src={micro} alt="Microwave" />
        </span>
      </section>
      <div className="buttonContainer">
        <button
          onClick={() => searchButtonClick("title")}
          className={
            selectedButton === "title" ? "buttonSelected" : "buttonSearcher"
          }
        >
          Título
        </button>
        <button
          onClick={() => searchButtonClick("artist")}
          className={
            selectedButton === "artist" ? "buttonSelected" : "buttonSearcher"
          }
        >
          Artista
        </button>
        <button
          onClick={() => searchButtonClick("album")}
          className={
            selectedButton === "album" ? "buttonSelected" : "buttonSearcher"
          }
        >
          Álbum
        </button>
      </div>
      <main id="mainSearcher">
        {searchResults.length > 0 ? (
          <ul className="searchResult">
            {searchResults.map((data) => (
              <li key={data.id}>
                <div className="topContainer">
                  <img
                    src={data.album_image}
                    alt={data.album_name}
                    className="artistImageSearch"
                  />
                  <div className="songDetails">
                    <p className="songName">{data.song_name}</p>
                    <p className="artistName">{data.artist_name}</p>
                  </div>
                  <img src={options} alt="Options" className="songOptions" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h5 className="titleTop"># Top 10</h5>
            <ul>
              {top &&
                top.map((item) => (
                  <li key={item.id}>
                    <div className="topContainer">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="artistImageSearch"
                      />
                      <div className="songDetails">
                        <p className="songName">{item.name}</p>
                        <p className="artistName">{item.artist}</p>
                      </div>
                      <img
                        src={options}
                        alt="Options"
                        className="songOptions"
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </main>
      <section id="footerSearcher">
        <Footer />
      </section>
    </div>
  );
}

export default Searcher;
