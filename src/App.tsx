import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import FootlessLayout from "./pages/layouts/FootlessLayout";
import EDLoadingScreen from "./components/LoadingScreen/EDLoadingScreen";
import Page404 from "./pages/Page404";
import {GlobalProvider} from "./Utils/Provider";
import Michelle from "./pages/Michelle";
import WorldPage from "./pages/WorldPage";
import DesignPortfolio from "./pages/DesignPortfolio";
// import Lorenz from "./pages/ParticlePages/Lorenz";
// import LorenzMod2 from "./pages/ParticlePages/LorenzMod2";
// import Thomas from "./pages/ParticlePages/Thomas";
// import Dequan from "./pages/ParticlePages/Dequan";
// import Dradas from "./pages/ParticlePages/Dradas";
// import Arneodo from "./pages/ParticlePages/Arneodo";
// import Aizawa from "./pages/ParticlePages/Aizawa";
// import Billcolak from "./pages/billcolak";

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
                        {/*<Route path="/bill" element={<Billcolak/>}/>*/}
                        {/*<Route path="/Lorenz" element={<Lorenz/>}/>*/}
                        {/*<Route path="/LorenzMod2" element={<LorenzMod2/>}/>*/}
                        {/*<Route path="/Thomas" element={<Thomas/>}/>*/}
                        {/*<Route path="/Dequan" element={<Dequan/>}/>*/}
                        {/*<Route path="/Dradas" element={<Dradas/>}/>*/}
                        {/*<Route path="/Arneodo" element={<Arneodo/>}/>*/}
                        <Route path="/World" element={<WorldPage/>}/>
                        <Route path="/GeoEarth" element={<GeoEarth/>}/>
                        <Route path="/Design" element={<DesignPage/>}/>
                        <Route path="/Gallery" element={<ProjectsPage/>}/>
                        <Route path="/Design-Portfolio" element={<DesignPortfolio/>}/>
                        <Route path="/Dev-Portfolio" element={<DevPortfolio/>}/>
                        <Route path="/Michelle" element={<Michelle/>}/>
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </Suspense>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
