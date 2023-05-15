import React from "react";
import "./Lobby.css";
import { NavLink, useNavigate } from "react-router-dom";
import logotipo from "../../assets/icons/logo-large.svg"

function Lobby() {
  const navigate =useNavigate();

  const goToRegister = () => {
    navigate("/register")
  }
  return (
    <div className="lobby-container">
      <div className="background-gif" /> {/* Div para el fondo del GIF */}
      <div className="content">
        <div className="logo">
          <img src={logotipo} alt="AUDN" className="logotipo" />
        </div>

        <h3 className="titleLobby">Música a medida</h3>
        <section className="sectionLobby">
          <button type="button" className="registrarsegratis" onClick={goToRegister}>
            Registrarse Gratis
          </button>
          <button type="button" className="continuarcongoogle">
            Continuar con Google
          </button>
          <button type="button" className="continuarconapple">
            Continuar con Apple
          </button>
          <div className="containerbutton">
            <button type="button" className="iniciarsesion">
              <NavLink to="/login"> Iniciar sesión </NavLink>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Lobby;
