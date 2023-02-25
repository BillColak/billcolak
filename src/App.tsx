import React, {Suspense} from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import DefaultLayout from "./pages/layouts/DefaultLayout";
import FootlessLayout from "./pages/layouts/FootlessLayout";
// import Resume from "./pages/Resume";
// import Game from "./Game/Game";
import GeoEarth from "./pages/GeoEarth";
import Test from "./pages/Test";
// import Collections from "./pages/Collections";
// import DesignProjects from "./pages/DesignProjects";
import Projects from "./pages/Projects";
import EDLoadingScreen from "./components/LoadingScreen/EDLoadingScreen";


function App() {
    return (
        <HashRouter>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Routes>
                    <Route path="/" element={<FootlessLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/GeoEarth" element={<GeoEarth/>}/>
                        <Route path="/Test" element={<Test/>}/>
                        <Route path="/Projects" element={<Projects/>}/>
                        {/*<Route path="/Collections" element={<Collections />} />*/}
                        {/*<Route path="/Design" element={<DesignProjects />} />*/}
                    </Route>
                    {/*<Route path="/" element={<DefaultLayout />}>*/}
                    {/*    <Route path="/Contact" element={<Contact />} />*/}
                    {/*    <Route path="/Resume" element={<Resume />} />*/}
                    {/*    <Route path="/Game" element={<Game />} />*/}
                    {/*</Route>*/}
                </Routes>
            </Suspense>
        </HashRouter>
    );
}

export default App;
