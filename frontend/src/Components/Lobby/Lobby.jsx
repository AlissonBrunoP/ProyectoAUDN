import React from "react";
import "./Lobby.css";
import { NavLink } from "react-router-dom";

function Lobby() {
  return (
    <div className="lobby-container">
      <div className="background-gif" /> {/* Div para el fondo del GIF */}
      <div className="content">
        <div className="logo">
          <img src="frontend\src\assets\Logos\Logotipo.png" alt="" />
        </div>

        <h3 className="">Música a medida</h3>
        <section>
          <button type="button" className="registrarsegratis">
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
