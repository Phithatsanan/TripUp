import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Discover from "./pages/Discover";
import Destination from "./pages/Destination";
import Mytrip from "./pages/Mytrip";
import Manage from "./pages/Manage";
import Edit from "./pages/Edit";

import AuthContext from "./auth/authcontext";
import ProtectedRoute from "./auth/ProtectedRoute";

import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export default function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />
  //   },
  //   {
  //     path: "/discover",
  //     element: <Discover />
  //   },
  //   {
  //     path: "/explore",
  //     element: <Explore />
  //   },
  //   {
  //     path: "/destination/:city_name",
  //     element: <Destination />
  //   },
  //   {
  //     path: "/mytrip",
  //     element: <ProtectedRoute><Mytrip /></ProtectedRoute>
  //   },
  //   {
  //     path: "/mytrip/:trip_id",
  //     element: <Protected><Manage /></Protected>
  //   },
  //   {
  //     path: "/edit",
  //     element: <Protected><Edit /></Protected>
  //   },

  //   {
  //     path: "*",
  //     element: <NoPage />
  //   },

  // ])

  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/destination" element={<Destination />} />

          <Route path="/discover/:city_id" element={<Destination />} />
          <Route path="/discover/:city_id/:adventure" element={<Destination />} />
          <Route path="/discover/:city_id/:leisure" element={<Destination />} />
          <Route path="/discover/:city_id/:entertainment" element={<Destination />} />
          <Route path="/discover/:city_id/:family" element={<Destination />} />
          <Route path="/discover/:city_id/:food" element={<Destination />} />

          <Route path="/mytrip" element={<ProtectedRoute><Mytrip /></ProtectedRoute>} />
          <Route path="/mytrip/:trip_id" element={<ProtectedRoute><Manage /></ProtectedRoute>} />
          <Route path="/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />

          <Route path="*" element={<NoPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthContext>

    // <AuthContext>
    //   <RouterProvider router={router}></RouterProvider>
    // </AuthContext>
  );
}