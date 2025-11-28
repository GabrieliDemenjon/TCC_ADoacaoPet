import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AddPet() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    // validação da idade
    const ageNum = Number(form.age);
    if (ageNum < 0 || ageNum > 25) {
      return alert("A idade deve estar entre 0 e 25 anos.");
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("age", form.age);
    data.append("type", form.type);
    data.append("description", form.description);

    if (image) data.append("image", image);

    try {
      await apiPost("/pets", data);
      alert("Pet cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pet.");
    }
  }

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Adicionar Novo Pet</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg p-6 rounded-xl"
      >
        {/* IMAGEM */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-full border mb-3"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mb-3">
              Foto
            </div>
          )}

          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold">
            Selecionar Imagem
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        {/* CAMPOS */}
        <input
          name="name"
          placeholder="Nome do Pet"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Idade (0 a 25)"
          value={form.age}
          onChange={handleChange}
          min={0}
          max={25}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="type"
          placeholder="Tipo (cachorro, gato...)"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Descrição do pet"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded h-24"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold"
        >
          Cadastrar Pet
        </button>
      </form>
    </main>
  );
}
