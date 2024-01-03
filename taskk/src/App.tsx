import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./modules/Home";
import Meeting from "./modules/Meeting";
import Pufik from "./modules/Pufik";
import Reserve from "./modules/Reserve";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/meeting" element={<Meeting />}/>
          <Route path="/pufik" element={<Pufik />}/>
          <Route path="/reserve/:roomName" element={<Reserve />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
