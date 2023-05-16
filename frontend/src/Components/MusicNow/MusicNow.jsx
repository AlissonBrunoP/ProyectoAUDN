import React, { useState } from "react";
import clock from "../../assets/icons/state=active.svg";
import campaign from "../../assets/icons/campana.svg";
import "./MusicNow.css";
import cupidoMusical from "../../assets/cupidoMusical.png";
import musicaContextual from "../../assets/musicaContextual.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

function MusicNow() {
  const navigate = useNavigate();

  const goToContext = () => {
    navigate("/contextMusic")
  }

  const goToCupid = () => {
    navigate("/CupidoMusical")
  }

  return (
    <>
    <div id="musicNowContainer">
      <div id="musicNowTop">
        <h3>Música ya</h3>
        <button id="btnClock">
          <img src={clock} alt="Reloj" />
        </button>
        <button id="btnCampaign">
          <img src={campaign} alt="Campana de notificación" />
        </button>
      </div>
      <button
        id="btnCupidoMusical"
        onClick={goToCupid}
        style={{
          borderTopRightRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        <div
          className="componentsHome"
          style={{
            borderBottomLeftRadius: "25px",
          }}
        >
          <div
            className="divImg"
            style={{
              borderBottomLeftRadius: "25px",
            }}
          >
            <img
              src={cupidoMusical}
              style={{
                borderBottomLeftRadius: "25px",
              }}
              alt="Cupido Musical "
            />
          </div>
          <div className="componentText">
            <h4 className="h4MusicNow">Cupido Musical</h4>
            <p>
              Tus artistas favoritos nunca van a dejarte con el corazón roto.
            </p>
          </div>
        </div>
      </button>
      <button
        id="btnMusicaContextual"
        onClick={goToContext}
        style={{
          borderTopRightRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        <div
          className="componentsHome"
          style={{
            borderBottomLeftRadius: "25px",
          }}
        >
          <div
            className="divImg"
            style={{
              borderBottomLeftRadius: "25px",
            }}
          >
            <img
              style={{
                borderBottomLeftRadius: "25px",
              }}
              src={musicaContextual}
              alt="Musica Contextual"
            />
          </div>
          <div className="componentText">
            <h4 className="h4MusicNow">Musica Contextual</h4>
            <p>Creamos la playlist perfecta para cualquier situación.</p>
          </div>
        </div>
      </button>
      <div id="footerContainerMN">
        <Footer />
      </div>
      </div>
    </>
  );
}

export default MusicNow;
