import React, {Suspense} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import FootlessLayout from "./pages/layouts/FootlessLayout";
import GeoEarth from "./pages/GeoEarth";
import Test from "./pages/Test";
import Projects from "./pages/Projects";
import EDLoadingScreen from "./components/LoadingScreen/EDLoadingScreen";
import Page404 from "./pages/Page404";
import DevPortfolio from "./pages/DevPortfolio";
// import RefreshApp from "./pages/RefreshApp";
// import RefreshModeration from "./pages/RefreshModeration";

// todo https://reactjs.org/docs/code-splitting.html
function App() {
    return (
        <HashRouter>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Routes>
                    <Route path="/" element={<FootlessLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/GeoEarth" element={<GeoEarth/>}/>
                        <Route path="/Test" element={<Test/>}/>
                        <Route path="/Gallery" element={<Projects/>}/>
                        <Route path="/Porfolio" element={<DevPortfolio/>}/>
                        {/*<Route path="/RefreshApp" element={<RefreshApp/>}/>*/}
                        {/*<Route path="/RefreshModeration" element={<RefreshModeration/>}/>*/}
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </Suspense>
        </HashRouter>
    );
}

export default App;
