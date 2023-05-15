import React, { useEffect, useState } from "react";
import "./CupidoMusical.css";
import ArrowHome from "../../assets/icons/position=left-1.svg";
import HartIcon from "../../assets/icons/style=outline, state=active-3.svg";
import CrossIcon from "../../assets/icons/style=default, position=diagonal.svg";
import MatchesIcon from "../../assets/icons/state=active.svg";
import IconLeft from "../../assets/icons/position=left.svg"
import IconRight from "../../assets/icons/position=right.svg"
import { useNavigate } from "react-router-dom";

function CupidoMusical() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artistList, setArtistList] = useState([{id:0, name:'', id_genre:0, artist_image:''}]); 
  const [imagesList, setImagesList] = useState([]);  
  const [idList, setIdList] = useState([]);  
  const [playList, setPlayList] = useState([]);
  //const [songsList, setSongsList] = useState([{id:0, name:'', artist_id:0, genre_id:0, album_id:0, duration:0}]);

  useEffect(() => {
    requestArtist();    
  }, []);

  const requestArtist = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/artist",
        requestOptions
      );
      if (response.ok) {
        const item = await response.json();
        setArtistList(item.artist);
        setCurrentIndex(0);     
        setImagesList([]);
        setIdList([]);
        setPlayList([]);  
      } else {
        alert("Ocurrio un error del lado del cliente");
      }
    } catch (error) {
      alert(error.message);
    } 
  };  

  const songsByArtist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      selectedArtist: idList,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/songsByArtist",
        requestOptions
      );    
      if (response.ok) {
        const data = await response.json();
        //return data.songs;
        setPlayList(data.songs); //songs array as a result of joining tables
        setCurrentIndex(0);     
        setImagesList([]);
        setIdList([]);

        console.log(playList);//----------------------------------------------------------------->>>>>>

      } else {
        console.log("Ha ocurrido un error inesperado. Intente nuevamente");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const Back = () => {
    navigate(-1)
  };

  const next = () => {
    setCurrentIndex(currentIndex === artistList.length - 1 ? 0 : currentIndex + 1);
  };

  const selectArtist = () => {  
    if (artistList.length > 1) {
      const newObject = artistList[currentIndex];
      if (currentIndex < 1) {
        setIsOpen(true);       
      }
      if (imagesList.length < 5) {
        setImagesList(arr => [...arr, newObject.artist_image]); 
      } else {
        setImagesList(() => {
          return [];
        }); 
      }
      setIdList(arr => [...arr, newObject.id]); //carga id de cada artista seleccionado
    
      console.log(idList);//------------------------------------------------------------------->>>>>>

      next();  
    }    
  }; 

  const createPlayList = () => { //onClick button
    songsByArtist(); //fetching and joining tables artist-songs
  };

  const closePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? "cardShadow" : "card"}>
      <header className="header">
        <div> 
          <img src={ArrowHome} onClick={Back} /> 
        </div>
        <div>
          <h4>Cupido Musical</h4>
        </div>
      </header>

      <div className="boxImage">
        <img src={artistList[currentIndex].artist_image} />
      </div>

      <div className="selectButtons">
        <button className="iconBox" onClick={selectArtist}>
          <img src={HartIcon} />
        </button>
        <button className="iconBox" onClick={next}>
          <img src={CrossIcon} />
        </button>
      </div>

      <div className="artistName">
        <h2>{artistList[currentIndex].name}</h2>   
      </div>

      <div className="matches">
        <h6>Matches actuales:</h6> 
        <img src={MatchesIcon} />  
      </div>      

      <div className="boxList">
        {Object.keys(imagesList).map((key, index) => (
          <div key={index}/*  style={{zIndex:key}} */ className="boxItem"> 
            <img  src={imagesList[key]} /> 
          </div>         
        ))}  
      </div>



      <div className="popUp">
        {isOpen && (
          <div className="dialog">
            <div className="dialogHeader">
              <h2>Cupido Musical</h2>
              <img src={IconLeft} alt="icon" />
              <img src={IconLeft} alt="icon" />
              <img src={IconRight} alt="icon" />
              <img src={IconRight} alt="icon" />
            </div>
            <p>Luego de al menos 2 me gusta, confirma tu selección y crearemos una playlist 
                rápida con los artistas que fueron un match.
              </p>
            <button onClick={closePopUp}>Entendido</button>
            <p>No volver a mostrar</p>
          </div>
        )}
      </div>


      <button className={(idList.length > 1) ? "createBtn" : "shadowCreateBtn"} onClick={createPlayList}>
         Crear Playlist
      </button>

    </div>
  );
};

export default CupidoMusical;
