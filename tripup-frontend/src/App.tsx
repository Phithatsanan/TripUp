import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Discover from "./pages/Discover";
import Destination from "./pages/Destination";
import Mytrip from "./pages/Mytrip";
import NoPage from "./pages/NoPage";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manage from "./pages/Manage";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home/>} />
        <Route path={process.env.PUBLIC_URL + "/explore"} element={<Explore/>} />
        <Route path={process.env.PUBLIC_URL + "/discover"} element={<Discover />} />
        <Route path={process.env.PUBLIC_URL + "/destination"} element={<Destination />} />
        <Route path={process.env.PUBLIC_URL + "/mytrip"} element={<Mytrip />} />

        <Route path={process.env.PUBLIC_URL + "/destination/:city"} element={<Destination />} />
        <Route path="/destination/:city/:adventure" element={<Destination />} />
        <Route path="/destination/:city/:leisure" element={<Destination />} />
        <Route path="/destination/:city/:entertainment" element={<Destination />} />
        <Route path="/destination/:city/:family" element={<Destination />} />
        <Route path="/destination/:city/:food" element={<Destination />} />

        <Route path={process.env.PUBLIC_URL + "/mytrip"} element={<Mytrip />} />
        <Route path={process.env.PUBLIC_URL + "/manage"} element={<Manage />} />
        
        <Route path={process.env.PUBLIC_URL + "*"} element={<NoPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

