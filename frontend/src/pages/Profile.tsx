import React, { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<any>({});

  async function loadProfile() {
    try {
      const data = await apiGet("/auth/me");
      setProfile(data);

      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        city: data.city || "",
        state: data.state || "",
      });

      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  function maskPhone(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10)
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");

    return value.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  }

  function handleChange(e: any) {
    let { name, value } = e.target;
    if (name === "phone") value = maskPhone(value);
    if (name === "state") value = value.toUpperCase().slice(0, 2);
    if (name === "city") value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validateProfile() {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "O nome é obrigatório.";

    if (!form.email.endsWith("@gmail.com")) newErrors.email = "O email precisa ser @gmail.com";

    if (!form.phone.trim()) newErrors.phone = "Informe um telefone válido.";

    if (form.phone.length < 14) newErrors.phone = "Telefone incompleto.";

    if (form.city.length < 2) newErrors.city = "Cidade inválida.";

    if (form.state.length !== 2) newErrors.state = "Use a sigla do estado (ex: SP).";

    return newErrors;
  }

  async function handleSave(e: any) {
    e.preventDefault();

    const validation = validateProfile();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const updated = await apiPatch("/auth/update", form);

      alert("Perfil atualizado com sucesso!");

      setUser(updated);  
      setIsEditing(false);
      loadProfile();
    } catch (err) {
      alert("Erro ao salvar perfil.");
      console.error(err);
    }
  }

  if (!user) return <p className="p-4">Você precisa estar logado.</p>;
  if (loading) return <p className="p-4">Carregando...</p>;
  if (!profile) return <p className="p-4">Erro ao carregar perfil.</p>;

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
          max-w-md w-full bg-white/70 backdrop-blur-xl
          p-8 rounded-3xl shadow-lg border border-rose-200
        "
      >
        <h1 className="text-3xl font-bold text-rose-500 text-center mb-6">
          Meu Perfil
        </h1>

        {!isEditing ? (
          <>
            <div className="space-y-3 text-gray-700 text-lg">
              <p><strong>Nome:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Telefone:</strong> {profile.phone || "Não informado"}</p>
              <p><strong>Cidade:</strong> {profile.city || "Não informado"}</p>
              <p><strong>Estado:</strong> {profile.state || "Não informado"}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="
                w-full bg-rose-500 text-white p-3 rounded-full 
                font-semibold mt-6 hover:bg-rose-600 transition
              "
            >
              Editar Perfil
            </button>
          </>
        ) : (
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <input
                name="name"
                className="input-rose"
                placeholder="Nome completo"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                className="input-rose"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                name="phone"
                className="input-rose"
                placeholder="Telefone"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <input
                name="city"
                className="input-rose"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>

            <div>
              <input
                name="state"
                className="input-rose"
                placeholder="Estado (SP)"
                value={form.state}
                onChange={handleChange}
              />
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="
                  w-1/2 bg-gray-400 text-white p-3 rounded-full 
                  font-semibold hover:bg-gray-500 transition
                "
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="
                  w-1/2 bg-rose-500 text-white p-3 rounded-full 
                  font-semibold hover:bg-rose-600 transition
                "
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
