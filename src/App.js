import React from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Client from "./pages/clients/Client";
import Employe from "./pages/employes/Employe";
import Caisse from "./pages/caisse/Caisse";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"

export default function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/client" element={<RequireAuth><Client /></RequireAuth>} />
          <Route path="/employe" element={<RequireAuth><Employe /></RequireAuth>} />
          <Route path="/caisse" element={<RequireAuth><Caisse /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
