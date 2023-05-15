import React from "react";
import sendEmail from "../../assets/icons/Vector-1.svg";
import "./ModalSendEmail.css";

function ModalSendEmail({ closeModal, email }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>
          Te enviamos un mensaje a{" "}
          <span>
            <b>{email} </b>
          </span>
          con un link verificador.
        </p>
        <img src={sendEmail} alt="" />
        <p>
          Para recuperar tu cuenta, debes ingresar al mismo y luego seguir las
          instrucciones.
        </p>
        <button
          className="close-button"
          onClick={closeModal}
          style={{
            borderTopRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

export default ModalSendEmail;
