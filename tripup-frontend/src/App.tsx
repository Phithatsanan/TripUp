import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Discover from "./pages/Discover";
import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/discover" element={<Discover />} />

        <Route path="*" element={<NoPage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  );
}

