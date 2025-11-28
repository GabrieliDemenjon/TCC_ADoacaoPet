import React, { useEffect, useState } from "react";
import { getPets } from "../utils/api";

export default function Home() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.error("Erro ao carregar pets:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <main className="p-4 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Pets Disponíveis para Adoção</h1>

      {pets.length === 0 && (
        <p className="text-gray-500">Nenhum pet disponível no momento.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {pets.map((pet) => (
          <div
            key={pet.id}
            className="border rounded-lg shadow p-4 flex flex-col"
          >
            {/* FOTO */}
            {pet.imageUrl ? (
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
            ) : (
              <div className="h-48 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-600">
                Sem foto
              </div>
            )}

            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <p className="text-gray-700">{pet.age} anos</p>
            <p className="text-gray-600">{pet.type}</p>

            <a
              href={`/pet/${pet.id}`}
              className="mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
            >
              Ver detalhes
            </a>
          </div>
        ))}

      </div>

    </main>
  );
}
