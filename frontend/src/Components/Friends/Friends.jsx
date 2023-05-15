import React from "react";
import ali from "../../assets/friends/anne.jpg";
import seba from "../../assets/friends/arezo.jpg";
import jose from "../../assets/friends/patch.jpg";
import vir from "../../assets/friends/julia.jpg";
import "./Friends.css";
import Footer from "../Footer/Footer";
import arrowLeft from "../../assets/icons/position=left-1.svg";
import { useNavigate } from "react-router-dom";

function Friends() {
  const navigate = useNavigate();

  const goBackButton = () => {
    navigate(-1);
  };
  return (
    <div id="myfriendsContainer">
      <section className="mySelfContainer">
        <div className="headerFriendsSection">
          <button className="goBack" onClick={goBackButton}>
            <img src={arrowLeft} alt="Go back" />
          </button>
          <h3 className="TitleOfFriendsSection">Mis amigos</h3>
        </div>
        <img src={ali} alt="Alisson Bruno" className="myImageFriends" />
        <h1 className="myNameFriends">Alisson Bruno 🎶</h1>
        <h3 className="myUserNameFriends">@ali_bruno</h3>
      </section>
      <section className="divisionFriends">
        <h4 className="myFriendsTitle">Mis amigos</h4>
        <button className="addFriendsButton">Agregar Amigos</button>
      </section>
      <section className="showMyFriendsSection">
        <div className="eachFriendContainer">
          <img src={seba} alt="Sebastian" className="myFriendImage" />
          <p className="myFriendName">Seba Bauer</p>
        </div>
        <hr />
        <div className="eachFriendContainer">
          <img src={jose} alt="José" className="myFriendImage" />
          <p className="myFriendName">José Marichal</p>
        </div>
        <hr />
        <div className="eachFriendContainer">
          <img src={vir} alt="Virginia" className="myFriendImage" />
          <p className="myFriendName">Vir</p>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Friends;
