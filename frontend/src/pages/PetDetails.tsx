
import React from 'react';
import { useParams } from 'react-router-dom';

export default function PetDetails(){
  const { id } = useParams();
  return (
    <main className="p-4">
      <h1 className="text-2xl">Detalhes do pet {id}</h1>
      <p>Informações importantes sobre o pet, histórico e botão de interesse.</p>
    </main>
  );
}
