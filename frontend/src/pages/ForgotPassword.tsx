import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await apiPost("/auth/forgot-password", { email });

    if (res?.status === "ok") {
      alert("Se o email existir, enviaremos um link para recuperação.");
    } else {
      alert("Erro ao solicitar redefinição de senha.");
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recuperar Senha</h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu email"
          className="p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded w-full">
          Enviar
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Lembrou a senha?{" "}
        <Link to="/login" className="text-blue-600">
          Entrar
        </Link>
      </p>
    </main>
  );
}
