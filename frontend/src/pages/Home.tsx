
import React from 'react';

export default function Home() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold" id="main-title">Encontre um amigo</h1>

      <section aria-labelledby="filters-heading" className="mt-4">
        <h2 id="filters-heading" className="sr-only">Filtros</h2>
        <form role="search" aria-label="Buscar pets" className="space-y-2">
          <label htmlFor="q" className="sr-only">Buscar por nome ou raça</label>
          <input id="q" name="q" type="search" placeholder="Pesquisar" className="p-2 border rounded w-full" />
        </form>
      </section>

      <section aria-labelledby="results" className="mt-6">
        <h2 id="results" className="text-xl">Resultados</h2>
        <ul aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <li className="border rounded p-3" role="article" aria-label="card de pet">
            <h3 className="font-semibold">Pingo — 2 anos</h3>
            <p className="text-sm">Vira-lata, porte médio</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
