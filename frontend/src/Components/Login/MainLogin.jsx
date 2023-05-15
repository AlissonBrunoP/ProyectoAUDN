/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import closedEye from "../../assets/icons/state=closed.svg";
import openEye from "../../assets/icons/state=open.svg";
import "./MainLogin.css";

function MainLogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function togglePasswordVisibility() {
    setIsPasswordVisible((visible) => !visible);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    // Realizar lógica de inicio de sesión aquí
  }

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <>
      <header className="header">
        <NavLink to="/">
          <img src={arrowLeft} alt="Left Arrow" />
        </NavLink>
        <p className="iniciarsesion">Iniciar Sesión</p>
      </header>

      <main>
        <form
          className="form"
          action=""
          style={{
            position: "relative",
          }}
        >
          <p className="inputitile">Nombre de Usuario o E-mail:</p>

          <input
            className="input-login"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <p className="inputitile">Contraseña</p>
          <input
            className="input-login"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          {isPasswordVisible ? (
            <img
              src={openEye}
              style={{
                position: "absolute",
                right: 10,
                bottom: 60,
              }}
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              alt="Arrow Left"
            />
          ) : (
            <img
              src={closedEye}
              style={{
                position: "absolute",
                right: 10,
                bottom: 60,
              }}
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              alt="Arrow Left"
            />
          )}
        </form>

        <button
          type="button"
          className={isFormValid ? "button" : "inactivebutton"}
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>

        <button type="button" className="olvido">
          {" "}
          <NavLink to="/resetaccount"> ¿Olvidaste tu contraseña? </NavLink>
        </button>
      </main>
    </>
  );
}

export default MainLogin;
