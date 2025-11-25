import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telefone: "",
    cidade: "",
    estado: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: any) {
    e.preventDefault();

    const data = await apiPost("/auth/register", form);

    if (data?.id) {
      alert("Conta criada com sucesso!");
      navigate("/login");
    } else {
      alert("Erro ao criar conta");
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>

      <form className="space-y-3" onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          placeholder="Nome completo"
          className="p-2 border rounded w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="p-2 border rounded w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="telefone"
          type="text"
          placeholder="Telefone"
          className="p-2 border rounded w-full"
          value={form.telefone}
          onChange={handleChange}
        />

        <input
          name="cidade"
          type="text"
          placeholder="Cidade"
          className="p-2 border rounded w-full"
          value={form.cidade}
          onChange={handleChange}
        />

        <input
          name="estado"
          type="text"
          placeholder="Estado"
          className="p-2 border rounded w-full"
          value={form.estado}
          onChange={handleChange}
        />

        <button className="px-4 py-2 bg-green-600 text-white rounded w-full">
          Criar Conta
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Já tem conta?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Entrar
        </Link>
      </p>
    </main>
  );
}
