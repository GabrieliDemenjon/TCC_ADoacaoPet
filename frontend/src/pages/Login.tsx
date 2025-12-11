import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  }

  function validateFields() {
    const { email, password } = form;

    if (!email.trim()) return "O email é obrigatório.";

    if (!email.endsWith("@gmail.com"))
      return "O email deve terminar com @gmail.com";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um email válido.";

    if (!password.trim()) return "A senha é obrigatória.";

    if (password.length < 6)
      return "A senha precisa ter no mínimo 6 caracteres.";

    return null;
  }

  async function handleLogin(e: any) {
    e.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await apiPost("/auth/login", form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);

        alert("Login realizado!");
        navigate("/profile");
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Email ou senha incorretos.");
    }
  }

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100
        px-6
      "
    >
      <main
        className="
          w-full max-w-md bg-white/60 backdrop-blur-xl 
          p-8 rounded-3xl shadow-lg border border-rose-200/40
        "
      >
        <h1 className="text-3xl font-semibold text-center text-rose-500 mb-6">
          Entrar
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input-rose"
            value={form.email}
            onChange={handleChange}
          />

          {/* SENHA + OLHO 👁️ */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="input-rose"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[10px] text-gray-600"
            >
              {showPassword ? "👁‍🗨" : "👁️"}
            </button>
          </div>

          <button className="btn-rose w-full">Entrar</button>
        </form>

        <div className="mt-6 text-center text-rose-700">
          <p className="text-sm">
            Não tem conta?{" "}
            <Link to="/register" className="text-rose-600 font-semibold">
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
