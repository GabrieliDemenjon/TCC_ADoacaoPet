import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    apiGet(`/pets/${id}`).then((data) => setPet(data));
  }, [id]);

  if (!pet) return <p>Carregando...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">{pet.name}</h1>
      <p><strong>Tipo:</strong> {pet.type}</p>
      <p><strong>Idade:</strong> {pet.age}</p>
      <p><strong>Status:</strong> {pet.adopted ? "Adotado" : "Disponível"}</p>

      <h3 className="text-xl mt-4">Tutor</h3>
      <p>{pet.user?.name}</p>
      <p>{pet.user?.email}</p>
    </main>
  );
}
