import React from "react";
/* import "./Components/"; */
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./login.css";

function Login() {
  return (
    <>
      <header className="header">
        <img src={arrowLeft} alt="Left Arrow" />
        <p className="iniciarsesion">Iniciar Sesión</p>
      </header>

      <main>
        <form className="form" action="">
          <p className="nomusuario">Nombre de Usuario o E-mail:</p>
          <br />
          <input className="primercampo" type="text" />
          <p className="contrasena">Contraseña</p>
          <input className="segundocampo" type="text" />
        </form>

        <button type="button" className="button">
          Iniciar Sesión
        </button>

        <p className="olvido"> ¿Olvidaste tu contraseña? </p>
      </main>
    </>
  );
}

export default Login;
