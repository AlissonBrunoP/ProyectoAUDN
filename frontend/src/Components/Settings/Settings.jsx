import React, { useState } from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./Settings.css";
import { Link, useNavigate, useParams } from "react-router-dom";


function Settings() {
  const navigate = useNavigate();

  const onClickReturn = () => {
    navigate(`/profile`, { replace: true });
  };

  
  return (
    <>
      <div id="settingsTop">
        <button className="btnArrowBack" onClick={onClickReturn}>
          <img src={arrowLeft} alt="" />
        </button>
        <h3>Configuración</h3>
      </div>
      <div>
        <button
          id="btnEdit"
          style={{
            borderTopRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          Editar Apariencia
        </button>
        <button
          id="btnEditProfile"
          style={{
            borderTopRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          Editar Perfil
        </button>
      </div>
      <div id="divButton">
        <p>Versión: V1.25.03</p>
        <div className="horizontalLine"></div>
        <button>Cerrar Sesión</button>
      </div>
    </>
  );
}
export default Settings;
