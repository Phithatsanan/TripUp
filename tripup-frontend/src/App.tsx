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
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/mytrip" element={<Mytrip />} />

        <Route path="/destination/:city" element={<Destination />} />
        <Route path="/destination/:city/:adventure" element={<Destination />} />
        <Route path="/destination/:city/:leisure" element={<Destination />} />
        <Route path="/destination/:city/:entertainment" element={<Destination />} />
        <Route path="/destination/:city/:family" element={<Destination />} />
        <Route path="/destination/:city/:food" element={<Destination />} />

        <Route path="/mytrip" element={<Mytrip />} />
        <Route path="/manage" element={<Manage />} />
        
        <Route path="*" element={<NoPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

