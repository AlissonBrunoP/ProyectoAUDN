import React from "react";
import arrowLeft from "../assets/position=left-1.svg";
import "../Components/Register.css";

function Register() {
  return (
    <div>
      <div id="registerTop">
        <button>
          <img src={arrowLeft} alt="Arrow Left" />{" "}
        </button>
        <p>Crear Cuenta</p>
      </div>
      <h1>¿Cuál es tu correo electrónico?</h1>
      <label htmlFor="emailRegister">Correo electrónico</label>
      <input type="email" id="emailRegister" />
      <p>Deberá poder confirmarlo luego.</p>
      <button>Continuar</button>
    </div>
  );
}

export default Register;
