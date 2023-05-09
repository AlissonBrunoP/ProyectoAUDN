import React from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./Register.css";

function Register() {
  const onClickReturn = () => {
    navigate(`/`, { replace: true });
  };
  return (
    <div>
      <div id="registerTop">
        <button className="btnArrowBack" onClick={onClickReturn}>
          <img src={arrowLeft} alt="" />
        </button>

        <h3>Crear Cuenta</h3>
      </div>
      <h1>¿Cuál es tu correo electrónico?</h1>
      <div id="inpMail" className="inputMail">
        <label htmlFor="emailRegister">
          <h4>Correo electrónico:</h4>
        </label>
        <input
          type="email"
          id="emailRegister"
          style={{
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        />
        <p>Deberá poder confirmarlo luego.</p>
      </div>
      <div id="inpPassword" className="inputMail">
        <label htmlFor="emailRegister">
          <h4>Contraseña:</h4>
        </label>
        <input
          type="password"
          id="passwordRegister"
          style={{
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        />
        <p>Deberá contener al menos 8 caracteres.</p>
      </div>
      <button
        id="btnConfirm"
        style={{
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        Continuar
      </button>
    </div>
  );
}

export default Register;
