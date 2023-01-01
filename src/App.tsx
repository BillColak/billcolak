import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DefaultLayout from "./pages/layouts/DefaultLayout";


function App() {
  return (
      <BrowserRouter>
          {/*<EventsProvider value={eventsValue}>*/}
              <Routes>
                  <Route path="/" element={<DefaultLayout />}>
                      <Route index element={<Home />} />
                      <Route path="/Contact" element={<Contact />} />
                  </Route>
              </Routes>
          {/*</EventsProvider>*/}
      </BrowserRouter>
  );
}

export default App;
