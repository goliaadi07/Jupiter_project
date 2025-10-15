// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import Signup from './Signup.jsx'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     <Signup />
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import ForgotPassword from "./forgotpassword.jsx";
import ResetPassword from "./resetpass.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
