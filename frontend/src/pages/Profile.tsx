import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const data = await apiGet("/auth/me");
      setProfile(data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) return <p className="p-4">Você precisa estar logado.</p>;
  if (loading) return <p className="p-4">Carregando...</p>;
  if (!profile) return <p className="p-4">Não foi possível carregar o perfil.</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      <div className="border p-4 rounded shadow bg-white">
        <p><strong>Nome:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Telefone:</strong> {profile.phone || "Não informado"}</p>
        <p><strong>Cidade:</strong> {profile.city || "Não informado"}</p>
        <p><strong>Estado:</strong> {profile.state || "Não informado"}</p>
      </div>
    </main>
  );
}
