import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";
import error from "../../assets/404.jpg";

function Error() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div id="errorPage">
      <img src={error} alt="Not Found" className="notFound" />
      <h2 className="notFoundTitle">Página no encontrada</h2>
      <p className="notFoundParagraph">
        Lo sentimos, pero la página ingresada no existe
      </p>
      <button onClick={backToHome} className="errorButton">
        Volver al Inicio
      </button>
    </div>
  );
}

export default Error;
