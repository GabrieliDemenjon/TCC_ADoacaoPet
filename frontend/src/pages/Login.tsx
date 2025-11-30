import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const data = await apiPost("/auth/login", { email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      alert("Login realizado!");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex flex-col items-center justify-center
        bg-gradient-to-br
        from-rose-50 via-pink-50 to-rose-100
        px-6
      "
    >
      <main
        className="
          w-full max-w-md 
          bg-white/60 backdrop-blur-xl 
          p-8 rounded-3xl 
          shadow-lg border border-rose-200/40
        "
      >
        <h1 className="text-3xl font-semibold text-center text-rose-500 mb-6">
          Entrar
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-3 
              rounded-xl 
              border border-rose-200 
              bg-white/70
              focus:ring-2 focus:ring-rose-300 focus:outline-none
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="
              w-full px-4 py-3 
              rounded-xl 
              border border-rose-200 
              bg-white/70
              focus:ring-2 focus:ring-rose-300 focus:outline-none
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="
              w-full py-3 
              bg-rose-500 text-white 
              rounded-full 
              font-medium 
              shadow-md 
              hover:bg-rose-600 
              transition-all
            "
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-rose-700">
          <p className="text-sm">
            Não tem conta?{" "}
            <Link to="/register" className="font-semibold text-rose-600">
              Criar Conta
            </Link>
          </p>

          <p className="text-sm mt-2">
            <Link to="/forgot-password" className="text-rose-500 underline">
              Esqueci minha senha
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
