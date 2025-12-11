import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetails from "./pages/PetDetails";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AddPet from "./pages/AddPet";
import Profile from "./pages/Profile";
import MyPets from "./pages/MyPets";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Logo from "./assets/logo.png";

function Navbar() {
  const { user, setUser } = useAuth();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <nav
      className="
        w-full px-6 py-2
        fixed top-0 left-0 z-50
        bg-white/40 backdrop-blur-xl
        border-b border-rose-200/40
        flex justify-between items-center
      "
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="Pet&Eu" className="w-12 opacity-150" />
        <span className="text-rose-500 font-semibold text-lg">Home</span>
      </Link>

      {!user && (
        <div className="flex gap-4 text-rose-600">
          <Link to="/login">Login</Link>
          <Link to="/register">Criar Conta</Link>
        </div>
      )}

      {user && (
        <div className="flex gap-5 items-center text-rose-600">
          <Link to="/profile">Meu Perfil</Link>
          <Link to="/my-pets">Meus Pets</Link>
          <Link to="/add-pet">+ Pet</Link>

          <span>Olá, {user.name}</span>

          <button
            onClick={handleLogout}
            className="bg-rose-500 text-white px-3 py-1 rounded-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}


function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const hideNavbarOn = ["/"];
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
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
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
