
import React from 'react';

export default function Login(){
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl">Login</h1>
      <form className="space-y-2" aria-label="formulário de login">
        <label className="block">
          <span className="sr-only">Email</span>
          <input type="email" placeholder="email" className="p-2 border rounded w-full" />
        </label>
        <label className="block">
          <span className="sr-only">Senha</span>
          <input type="password" placeholder="senha" className="p-2 border rounded w-full" />
        </label>
      </form>
    </main>
  );
}
