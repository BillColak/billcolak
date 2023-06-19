import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import FootlessLayout from "./pages/layouts/FootlessLayout";
import EDLoadingScreen from "./components/LoadingScreen/EDLoadingScreen";
import Page404 from "./pages/Page404";
import {GlobalProvider} from "./Utils/Provider";

const ProjectsPage = React.lazy(() => import('./pages/Projects'));
const DesignPage = React.lazy(() => import('./pages/DesignPage'));
const DevPortfolio = React.lazy(() => import('./pages/DevPortfolio'));
const GeoEarth = React.lazy(() => import('./pages/GeoEarth'));


function App() {
    return (
        <BrowserRouter>
            <GlobalProvider>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Routes>
                    <Route path="/" element={<FootlessLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/GeoEarth" element={<GeoEarth/>}/>
                        <Route path="/Design" element={<DesignPage/>}/>
                        <Route path="/Gallery" element={<ProjectsPage/>}/>
                        <Route path="/Porfolio" element={<DevPortfolio/>}/>
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </Suspense>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
