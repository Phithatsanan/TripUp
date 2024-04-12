import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Discover from "./pages/Discover";
import Destination from "./pages/Destination";
import Mytrip from "./pages/Mytrip";
import Manage from "./pages/Manage";
import Edit from "./pages/Edit";

import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/destination" element={<Destination />} />
        

        <Route path="/destination/:city" element={<Destination />} />
        <Route path="/destination/:city/:adventure" element={<Destination />} />
        <Route path="/destination/:city/:leisure" element={<Destination />} />
        <Route path="/destination/:city/:entertainment" element={<Destination />} />
        <Route path="/destination/:city/:family" element={<Destination />} />
        <Route path="/destination/:city/:food" element={<Destination />} />

        <Route path="/mytrip" element={<Mytrip />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/:trip" element={<Manage />} />
        <Route path="/edit" element={<Edit />} />
        
        <Route path="*" element={<NoPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

