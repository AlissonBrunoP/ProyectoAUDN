import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MusicaContextual from "./Components/MusicaContextual/MusicaContextual.jsx";
import Playlist from "./Components/Playlist/Playlist.jsx";
import Searcher from "./Components/Searcher/Searcher.jsx";
import Friends from "./Components/Friends/Friends.jsx";
import Error from "./Components/ErrorPage/Error.jsx";
import Lobby from "./Components/Lobby/Lobby.jsx";
import MainLogin from "./Components/Login/MainLogin.jsx";
import CupidoMusical from "./Components/CupidoMusical/CupidoMusical.jsx";
import MusicNow from "./Components/MusicNow/MusicNow.jsx";
import Register from "./Components/Register/Register.jsx";
import Settings from "./Components/Settings/Settings.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import RecAccount from "./Components/RecAccount/RecAccount.jsx";


const Router = createBrowserRouter([
  { path: "/", element: <Lobby /> },
  { path: "/contextMusic", element: <MusicaContextual /> },
  { path: "/playlist", element: <Playlist /> },
  { path: "/search", element: <Searcher /> },
  { path: "/friends", element: <Friends /> },
  { path: "*", element: <Error /> },
  {path: "/login", element: <MainLogin />},
  { path: "/CupidoMusical", element: <CupidoMusical />},
  { path: "/home", element: <MusicNow />},
  { path: "/register", element: <Register />},
  { path: "/settings", element: <Settings />},
  { path: "/profile", element: <Profile />},
  { path: "/resetaccount", element: <RecAccount />},

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
