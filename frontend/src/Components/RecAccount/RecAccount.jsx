import React, { useState } from "react";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import ModalSendEmail from "../ModalSendEmail/ModalSendEmail";
import "./RecAccount.css";

function RecAccount() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => {
    if (email.endsWith(".com")) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      {!showModal && (
        <div>
          <div id="recoverTop">
            <button className="btnArrowBack">
              <img src={arrowLeft} alt="" />
            </button>
            <h3>Recuperar Cuenta</h3>
          </div>

          <div id="recoverMail" className="inputMail">
            <label htmlFor="emailRegister">
              <h4>Nombre de Usuario o E-mail:</h4>
            </label>
            <input
              type="email"
              id="emailRegister"
              value={email}
              onChange={handleEmailChange}
              style={{
                borderTopRightRadius: "17px",
                borderBottomLeftRadius: "17px",
              }}
            />
            <p>
              Deberás poder ingresar al e-mail de la cuenta para poder
              recuperarla.
            </p>
          </div>
          <button
            id="btnConfirm"
            className="btnConfirmStyle"
            style={{
              borderTopRightRadius: "17px",
              borderBottomLeftRadius: "17px",
              marginTop: "200px",
              backgroundColor: email.endsWith(".com") ? "#FF8E0A" : "#E4E6E8",
              cursor: email.endsWith(".com") ? "pointer" : "not-allowed",
            }}
            onClick={openModal}
            disabled={!email.endsWith(".com")}
          >
            Continuar
          </button>
        </div>
      )}

      {showModal && email !== "" && (
        <ModalSendEmail closeModal={closeModal} email={email} />
      )}
    </>
  );
}

export default RecAccount;
