import React, { Profiler } from "react";
import MusicaContextual from "./Components/MusicaContextual/MusicaContextual";
import Register from "./Components/Register/Register";
import RecAccount from "./Components/RecAccount/RecAccount";
import ModalSendEmail from "./Components/ModalSendEmail/ModalSendEmail";
import MusicNow from "./Components/MusicNow/MusicNow";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./Components/Settings/Settings";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MusicNow />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
