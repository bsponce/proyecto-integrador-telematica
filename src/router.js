import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome"
import Login from "./pages/login/Login"
import WaitingRoom from "./pages/waiting-room/WaitingRoom";
import UserList from "./pages/user-list/UserList";
import Nivel1 from "./pages/niveles/nivel1/Nivel1";
import Nivel2 from "./pages/niveles/nivel2/Nivel2";
import Nivel3 from "./pages/niveles/nivel3/Nivel3";
import InstruccionesNivel1 from "./pages/niveles/nivel1/InstruccionesNivel1";
import InstruccionesNivel2 from "./pages/niveles/nivel2/InstruccionesNivel2";
import InstruccionesNivel3 from "./pages/niveles/nivel3/InstruccionesNivel3";


const RouterPage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Welcome />} />
      <Route exact path="/home" element={<Welcome />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/user-list" element={<UserList />} />
      <Route exact path="/waiting-room" element={<WaitingRoom />} />
      <Route exact path="/nivel1" element={<Nivel1 />} />
      <Route exact path="/nivel2" element={<Nivel2 />} />
      <Route exact path="/nivel3" element={<Nivel3 />} />
      <Route exact path="/instrucciones1" element={<InstruccionesNivel1 />} />
      <Route exact path="/instrucciones2" element={<InstruccionesNivel2 />} />
      <Route exact path="/instrucciones3" element={<InstruccionesNivel3 />} />
    </Routes>
  );
};

export default RouterPage;