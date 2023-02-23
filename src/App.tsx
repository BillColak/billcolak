import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import FootlessLayout from "./pages/layouts/FootlessLayout";
import Resume from "./pages/Resume";
import Game from "./Game/Game";
import GeoEarth from "./pages/GeoEarth";
import Test from "./pages/Test";
import Collections from "./pages/Collections";
import DesignProjects from "./pages/DesignProjects";


function App() {
  return (
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<FootlessLayout />}>
                      <Route index element={<Home />} />
                      <Route path="/GeoEarth" element={<GeoEarth />} />
                      <Route path="/Test" element={<Test />} />
                      <Route path="/Collections" element={<Collections />} />
                      <Route path="/Design" element={<DesignProjects />} />
                  </Route>
                  <Route path="/" element={<DefaultLayout />}>
                      <Route path="/Contact" element={<Contact />} />
                      <Route path="/Resume" element={<Resume />} />
                      <Route path="/Game" element={<Game />} />
                  </Route>
              </Routes>
      </BrowserRouter>
  );
}

export default App;
