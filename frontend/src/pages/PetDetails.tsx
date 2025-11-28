import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, apiPatch } from "../utils/api";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  async function loadPet() {
    try {
      const data = await apiGet(`/pets/${id}`);
      setPet(data);
      setLoading(false);
    } catch (e) {
      console.error("Erro ao carregar pet:", e);
      setLoading(false);
    }
  }


  async function handleAdopt() {
    if (!confirm("Tem certeza que deseja adotar este pet?")) return;

    try {
      await apiPatch(`/pets/${id}/adopt`);
      alert("Pet adotado com sucesso!");
      loadPet(); 
    } catch (e) {
      alert("Erro ao adotar pet");
      console.error(e);
    }
  }

  useEffect(() => {
    loadPet();
  }, [id]);


  if (loading) return <p className="p-4">Carregando...</p>;
  if (!pet) return <p className="p-4">Pet não encontrado.</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{pet.name}</h1>


      {pet.imageUrl && (
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-64 h-64 object-cover rounded mx-auto mb-4"
        />
      )}

      <p><strong>Tipo:</strong> {pet.type}</p>
      <p><strong>Idade:</strong> {pet.age} anos</p>
      <p>
        <strong>Status:</strong>{" "}
        {pet.adopted ? "Adotado ❤️" : "Disponível"}
      </p>


      <h3 className="text-xl mt-4 font-semibold">Tutor</h3>
      <p>{pet.user?.name}</p>
      <p>{pet.user?.email}</p>


      {pet.adopted && pet.adopter && (
        <>
          <h3 className="text-xl mt-4 font-semibold">Adotado por</h3>
          <p>{pet.adopter.name}</p>
          <p>{pet.adopter.email}</p>
        </>
      )}


      {!pet.adopted && (
        <button
          onClick={handleAdopt}
          className="mt-6 w-full bg-blue-600 text-white p-3 rounded font-semibold"
        >
          Adotar Pet
        </button>
      )}
    </main>
  );
}
