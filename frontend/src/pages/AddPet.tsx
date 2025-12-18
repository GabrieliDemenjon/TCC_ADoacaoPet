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

  const [errors, setErrors] = useState<any>({});

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleImage(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    setErrors({ ...errors, image: "" });
  }

  function validateFields() {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "O nome do pet é obrigatório.";
    if (!form.age.toString().trim()) newErrors.age = "A idade é obrigatória.";
    if (Number(form.age) < 0 || Number(form.age) > 25) newErrors.age = "A idade deve estar entre 0 e 25 anos.";

    if (!form.type.trim()) newErrors.type = "O tipo é obrigatório.";

    if (!form.description.trim()) newErrors.description = "A descrição é obrigatória.";

    if (!image) newErrors.image = "A imagem é obrigatória.";

    return newErrors;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const validation = validateFields();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
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
      navigate("/my-pets");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar pet.");
    }
  }

  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100
      px-6
    ">
      <main className="
        w-full max-w-md
        bg-white/60 backdrop-blur-xl
        p-8 rounded-3xl shadow-lg
        border border-rose-200/40
        mt-10
      ">
        <h1 className="text-3xl font-semibold text-center text-rose-500 mb-6">
          Doar um novo Pet
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="flex flex-col items-center mb-2">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-36 h-36 object-cover rounded-full border-2 border-rose-200 shadow-md"
              />
            ) : (
              <div className="
                w-36 h-36 rounded-full 
                bg-gray-200 flex items-center justify-center
                text-gray-600 shadow-inner
              ">
                Foto
              </div>
            )}

            <label className="
              cursor-pointer px-4 py-2 mt-3
              bg-rose-500 hover:bg-rose-600 
              text-white rounded-full text-sm font-semibold 
              shadow-md transition
            ">
              Selecionar Imagem
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>

            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div>
            <input
              name="name"
              placeholder="Nome do Pet"
              value={form.name}
              onChange={handleChange}
              className="input-rose"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              name="age"
              type="number"
              placeholder="Idade (0 a 25)"
              value={form.age}
              onChange={handleChange}
              className="input-rose"
            />
            {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
          </div>

          <div>
            <input
              name="type"
              placeholder="Tipo (cachorro, gato...)"
              value={form.type}
              onChange={handleChange}
              className="input-rose"
            />
            {errors.type && <p className="text-red-600 text-sm">{errors.type}</p>}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Descrição do pet"
              value={form.description}
              onChange={handleChange}
              className="input-rose h-28 resize-none"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          <button className="btn-rose w-full">Cadastrar Pet</button>
        </form>
      </main>
    </div>
  );
}
