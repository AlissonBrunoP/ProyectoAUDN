import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import "./Register.css";
import close from "../../assets/icons/state=closed.svg";
import open from "../../assets/icons/state=open.svg";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState("");
  const [isShowingHiddenMail, setIsShowingHiddenMail] = useState(true);

  const onClickReturn = () => {
    if (isShowingHiddenMail) {
      navigate(`/`, { replace: true });
    } else {
      setIsHidden(true);
      setIsShowingHiddenMail(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsButtonEnabled(
      event.target.value.indexOf("@") !== -1 &&
        event.target.value.endsWith(".com")
    );
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(event.target.value);
    setIsPasswordValid(newPassword.length >= 8);

    if (newPassword.length < 8) {
      setIsPasswordValid(false);
      setInputBorderColor("#ea0f0f");
    } else {
      setIsPasswordValid(true);
      setInputBorderColor("#03a400");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmClick = () => {
    setIsHidden(false);
    setIsShowingHiddenMail(false);
  };
  const checkUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: username,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/check",
        requestOptions
      );
      const data = await response.json();
      if (data.exists || username === "") {
        setIsValidUsername(false);
        setMessage(
          <span style={{ color: "#ea0f0f" }}>
            El nombre de usuario ya está en uso o es invalido.
          </span>
        );
      } else {
        setIsValidUsername(true);
        setMessage(
          <span style={{ color: "#03a400" }}>
            El nombre de usuario está disponible
          </span>
        );
      }
    } catch (error) {
      alert("Ha ocurrido un error, intenta nuevamente.");
    }
  };

  const registerUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/register",
        requestOptions
      );
      const data = await response.json();
      if (response.status === 400) {
        setMessage(
          <span style={{ color: "#ea0f0f" }}>
            El nombre de usuario ya está en uso
          </span>
        );
      } else if (response.ok) {
        navigate(`/home`, { replace: true });
      }
    } catch (error) {
      alert("Ha ocurrido un error, intenta nuevamente.");
    }
  };
  const validStepTwo = function () {
    return isValidUsername && isPasswordValid;
  };
  return (
    <div>
      <div id="registerTop">
        <button type="button" className="btnArrowBack" onClick={onClickReturn}>
          <img src={arrowLeft} alt="" />
        </button>
        <h3>Crear Cuenta</h3>
      </div>

      {isHidden ? (
        <div id="hiddenMail">
          <h1 className="titleH1">¿Cuál es tu correo electrónico?</h1>
          <div id="inpMail" className="inputMail">
            <label htmlFor="emailRegister">
              <h4 className="titleH4">Correo electrónico:</h4>
            </label>
            <input
              type="email"
              id="emailRegister"
              style={{
                borderTopRightRadius: "17px",
                borderBottomLeftRadius: "17px",
              }}
              value={email}
              onChange={handleEmailChange}
            />
            <p>Deberá poder confirmarlo luego.</p>
          </div>
          <button
            type="button"
            id="btnConfirm"
            className="btnConfirmStyle"
            style={{
              borderTopRightRadius: "17px",
              borderBottomLeftRadius: "17px",
              marginTop: "200px",
              backgroundColor: isButtonEnabled ? "#FF8E0A" : "#E4E6E8",
              cursor: isButtonEnabled ? "pointer" : "not-allowed",
            }}
            disabled={!isButtonEnabled}
            onClick={handleConfirmClick}
          >
            Continuar
          </button>
        </div>
      ) : (
        <div id="divHidden">
          <h1 className="titleH1">Ingresa un nombre de usuario y Contraseña.</h1>
          <div id="inpUser" className="inputMail">
            <label htmlFor="userRegister">
              <h4 className="titleH4">Nombre de Usuario:</h4>
            </label>
            <input
              type="text"
              id="userRegister"
              style={{
                borderTopRightRadius: "17px",
                borderBottomLeftRadius: "17px",
              }}
              value={username}
              onChange={handleUsernameChange}
              onBlur={checkUser}
            />
            <p style={{ marginTop: "1px" }}>{message}</p>
          </div>

          <div id="inpPassword" className="inputMail">
            <label htmlFor="passwordRegister">
              <h4 className="titleH4">Contraseña:</h4>
            </label>
            <form className="formRegister"
              style={{
                borderTopRightRadius: "17px",
                borderBottomLeftRadius: "17px",
                borderColor: inputBorderColor,
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="passwordRegister"
                value={password}
                onChange={handlePasswordChange}
              />

              <img
                src={showPassword ? open : close}
                alt="Icono de ocultamiento"
                onClick={toggleShowPassword}
              />
            </form>

            <p
              className={
                isPasswordValid === null
                  ? ""
                  : isPasswordValid
                  ? "validMessage"
                  : "errorMessage"
              }
            >
              Deberá contener al menos 8 caracteres.
            </p>
          </div>
          <div className="termsContainer">
            <input type="checkbox" id="termsCheckbox" />
            <label htmlFor="termsCheckbox" id="labelCheckbox">
              He leído y acepto los <a href="" className="linkTag">Términos</a> y
              <a className="linkTag" href="">Condiciones</a>
            </label>
          </div>
        </div>
      )}

      {!isHidden && (
        <button
          className="btnConfirmStyle"
          id="btnConfirmUser"
          style={{
            borderTopRightRadius: "17px",
            borderBottomLeftRadius: "17px",
            backgroundColor: validStepTwo() ? "#FF8E0A" : "#E4E6E8",
            cursor: validStepTwo() ? "pointer" : "not-allowed",
            marginTop: "25px",
          }}
          disabled={!validStepTwo()}
          onClick={registerUser}
        >
          Continuar
        </button>
      )}
    </div>
  );
}

export default Register;
