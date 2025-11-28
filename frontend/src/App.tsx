import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetails from "./pages/PetDetails";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AddPet from "./pages/AddPet";
import Profile from "./pages/Profile";
import MyPets from "./pages/MyPets";


import { AuthProvider, useAuth } from "./context/AuthContext";


function Navbar() {
  const { user, setUser } = useAuth();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <a href="/" className="font-bold text-xl">Pet Adoção</a>

      <div className="flex gap-4 items-center">

        <a href="/" className="hover:underline">Home</a>

        {!user && (
          <>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/register" className="hover:underline">Criar Conta</a>
          </>
        )}

        {user && (
          <>
            <a href="/profile" className="hover:underline">Meu Perfil</a>
            <a href="/my-pets" className="hover:underline">Meus Pets</a>

            <a href="/add-pet" className="hover:underline">
              + Adicionar Pet
            </a>


            <span className="font-semibold">
              Olá, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-pets" element={<MyPets />} />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
