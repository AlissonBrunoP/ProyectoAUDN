import React from "react";
import home from "../../assets/icons/home.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import friends from "../../assets/icons/friends.svg";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  //CAMBIAR LAS RUTAS CUANDO ESTEN LOS COMPONENTES!!!!!!
  const goHome = () => {
    navigate("/home");
  };

  const goSearch = () => {
    navigate("/search");
  };

  const goProfile = () => {
    navigate("/profile");
  };

  const goFriends = () => {
    navigate("/friends");
  };

  return (
    <footer className="footer">
      <button className="buttonFooter" onClick={goHome}>
        <img src={home} alt="Home" />
        Inicio
      </button>
      <button className="buttonFooter" onClick={goSearch}>
        <img src={search} alt="Search" />
        Buscador
      </button>
      <button className="buttonFooter" onClick={goProfile}>
        <img src={profile} alt="Profile" />
        Perfil
      </button>
      <button className="buttonFooter" onClick={goFriends}>
        <img src={friends} alt="Friends" />
        Amigos
      </button>
    </footer>
  );
}

export default Footer;
