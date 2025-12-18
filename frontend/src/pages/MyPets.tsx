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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 px-6 py-24">

      <h1 className="text-4xl font-bold text-rose-500 text-center mb-10">
        Meus Pets
      </h1>

      {pets.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          Você ainda não colocou nenhum pet para doação🐾
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="
              bg-white/70 backdrop-blur-xl 
              rounded-2xl shadow-md border border-rose-200 
              p-4 hover:shadow-lg hover:scale-[1.02] transition
            "
          >
            {pet.imageUrl ? (
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 rounded-xl mb-3 flex items-center justify-center">
                Sem foto
              </div>
            )}

            <h2 className="text-xl font-semibold text-rose-600">{pet.name}</h2>
            <p>{pet.age} anos</p>
            <p className="mb-3">{pet.type}</p>

            <a
              href={`/pet/${pet.id}`}
              className="
                block bg-rose-500 text-white text-center py-2 
                rounded-full font-medium shadow hover:bg-rose-600 transition
              "
            >
              Ver detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
