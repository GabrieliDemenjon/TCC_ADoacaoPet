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
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100
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
          Recuperar Senha
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu email"
            className="input-rose"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn-rose w-full">Enviar</button>
        </form>

        <p className="text-center text-rose-700 mt-6">
          Lembrou a senha?{" "}
          <Link className="text-rose-600 font-semibold" to="/login">
            Entrar
          </Link>
        </p>
      </main>
    </div>
  );
}
