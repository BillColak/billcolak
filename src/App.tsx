import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import Resume from "./pages/Resume";
import Game from "./Game/Game";
import Cupola from "./pages/Cupola";


function App() {
  return (
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<DefaultLayout />}>
                      <Route index element={<Home />} />
                      <Route path="/Contact" element={<Contact />} />
                      <Route path="/Resume" element={<Resume />} />
                      <Route path="/Game" element={<Game />} />
                  </Route>
                  <Route path="/Cupola" element={<Cupola />} />
              </Routes>
      </BrowserRouter>
  );
}

export default App;
