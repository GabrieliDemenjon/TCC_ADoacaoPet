import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function MyPets() {
  const { user } = useAuth();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPets() {
    try {
      const data = await apiGet("/pets/my-pets");
      setPets(data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar pets:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPets();
  }, []);

  if (!user) return <p className="p-4">Você precisa estar logado.</p>;
  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Meus Pets</h1>

      {pets.length === 0 && (
        <p className="text-gray-500">Você ainda não cadastrou nenhum pet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="border rounded p-4 shadow bg-white">
            {pet.imageUrl ? (
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 rounded mb-3 flex items-center justify-center">
                Sem foto
              </div>
            )}

            <h2 className="text-lg font-semibold">{pet.name}</h2>
            <p>{pet.age} anos</p>
            <p className="mb-3">{pet.type}</p>

            <a
              href={`/pet/${pet.id}`}
              className="block bg-blue-600 text-white text-center py-2 rounded"
            >
              Ver detalhes
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
