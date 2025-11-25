import React, { useEffect, useState } from "react";
import { getPets } from "../utils/api";

export default function Home() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error("Erro ao carregar pets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPets();
  }, []);

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Encontre um amigo</h1>

      <section className="mt-6">
        <h2 className="text-xl">Resultados</h2>

        {loading && <p>Carregando...</p>}

        {!loading && pets.length === 0 && (
          <p className="text-gray-500 mt-4">Nenhum pet encontrado.</p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {pets.map((pet) => (
            <li key={pet.id} className="border rounded p-3">
              <h3 className="font-semibold">
                {pet.name} — {pet.age} anos
              </h3>
              <p className="text-sm">{pet.type}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
