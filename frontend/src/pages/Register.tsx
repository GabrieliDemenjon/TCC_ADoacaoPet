import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  function maskPhone(value: string) {
    value = value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function handleChange(e: any) {
    let { name, value } = e.target;

    if (name === "phone") value = maskPhone(value);

    if (name === "state") value = value.toUpperCase().slice(0, 2);

    if (name === "city")
      value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    setForm({ ...form, [name]: value });
    setError("");
  }


  function validateFields() {
    if (!form.email.endsWith("@gmail.com"))
      return "O email deve terminar com @gmail.com";

    const password = form.password;

    if (password.length < 6)
      return "A senha precisa ter no mínimo 6 caracteres.";

    if (!/[0-9]/.test(password))
      return "A senha precisa ter ao menos 1 número.";

    if (!/[a-zA-Z]/.test(password))
      return "A senha precisa ter ao menos 1 letra.";

    if (!/[!@#$%^&*()_+\-=?]/.test(password))
      return "A senha precisa ter ao menos 1 símbolo (!@#$%).";

    if (form.phone.length < 14)
      return "Digite um telefone válido no formato (XX) XXXXX-XXXX";

    if (form.city.length < 3)
      return "Digite uma cidade válida.";

    if (form.state.length !== 2)
      return "O estado deve ter exatamente 2 letras, ex: SP";

    return null;
  }


  async function handleRegister(e: any) {
    e.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await apiPost("/auth/register", form);

      if (data?.id) {
        alert("Conta criada com sucesso!");
        navigate("/login");
      } else {
        alert("Erro ao criar conta");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar dados.");
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Criar Conta
      </h1>

      <form className="space-y-3" onSubmit={handleRegister}>
        {error && (
          <p className="text-red-600 font-semibold bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

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
          placeholder="Email (apenas @gmail.com)"
          className="p-2 border rounded w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* CAMPO DE SENHA COM OLHO */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="p-2 border rounded w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="absolute right-3 top-2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <input
          name="phone"
          type="text"
          placeholder="Telefone"
          className="p-2 border rounded w-full"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          type="text"
          placeholder="Cidade"
          className="p-2 border rounded w-full"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          name="state"
          type="text"
          placeholder="Estado (ex: SP)"
          className="p-2 border rounded w-full"
          value={form.state}
          onChange={handleChange}
          required
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
