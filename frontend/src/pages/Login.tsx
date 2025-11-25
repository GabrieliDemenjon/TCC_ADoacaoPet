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
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>

      <form className="space-y-3" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded w-full">
          Entrar
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Criar Conta
          </Link>
        </p>

        <p className="text-sm text-gray-700 mt-2">
          <Link to="/forgot-password" className="text-blue-600">
            Esqueci minha senha
          </Link>
        </p>
      </div>
    </main>
  );
}
