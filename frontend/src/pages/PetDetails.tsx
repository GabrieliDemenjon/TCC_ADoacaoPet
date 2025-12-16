import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPatch, apiDelete } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    type: "",
    description: "",
  });

  const [errors, setErrors] = useState<any>({});

  async function loadPet() {
    try {
      const data = await apiGet(`/pets/${id}`);
      setPet(data);

      setEditForm({
        name: data.name,
        age: data.age,
        type: data.type,
        description: data.description,
      });

      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar pet:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPet();
  }, [id]);

  function handleEditChange(e: any) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validateEdit() {
    const newErrors: any = {};

    if (!editForm.name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!editForm.age.toString().trim()) newErrors.age = "A idade é obrigatória.";

    const ageNum = Number(editForm.age);
    if (ageNum < 0 || ageNum > 25)
      newErrors.age = "A idade deve estar entre 0 e 25 anos.";

    if (!editForm.type.trim()) newErrors.type = "O tipo é obrigatório.";
    if (!editForm.description.trim())
      newErrors.description = "A descrição é obrigatória.";

    return newErrors;
  }

  async function handleSaveEdit(e: any) {
    e.preventDefault();

    const validation = validateEdit();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      await apiPatch(`/pets/${id}`, editForm);
      alert("Pet atualizado com sucesso!");
      setIsEditing(false);
      loadPet();
    } catch (err) {
      console.error(err);
      alert("Erro ao editar pet.");
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este pet?")) return;

    try {
      await apiDelete(`/pets/${id}`);
      alert("Pet excluído com sucesso!");
      navigate("/my-pets");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir pet.");
    }
  }

  async function handleAdopt() {
    if (!confirm("Tem certeza que deseja adotar este pet?")) return;

    try {
      await apiPatch(`/pets/${id}/adopt`);
      alert("Pet adotado com sucesso!");
      loadPet();
    } catch (err) {
      console.error(err);
      alert("Erro ao adotar pet.");
    }
  }

  // 🔑 AJUSTE CIRÚRGICO AQUI
  const isOwner = user?.id === pet?.userId;
  const canAdopt = user && !isOwner && !pet?.adopted;

  if (loading) return <p className="p-4">Carregando...</p>;
  if (!pet) return <p className="p-4">Pet não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 px-6 py-24">
      <div
        className="
        max-w-xl mx-auto bg-white/70 backdrop-blur-xl 
        p-8 rounded-3xl shadow-lg border border-rose-200
      "
      >
        <h1 className="text-3xl font-bold text-rose-500 mb-4 text-center">
          {isEditing ? "Editar Pet" : pet.name}
        </h1>

        {pet.imageUrl && !isEditing && (
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-64 h-64 object-cover rounded-2xl mx-auto mb-6 shadow"
          />
        )}

        {!isEditing && (
          <>
            <p><strong>Tipo:</strong> {pet.type}</p>
            <p><strong>Idade:</strong> {pet.age} anos</p>
            <p className="mt-2">
              <strong>Status:</strong>{" "}
              {pet.adopted ? "Adotado ❤️" : "Disponível"}
            </p>

            <h3 className="text-xl mt-6 font-semibold text-rose-600">Tutor</h3>
            <p>{pet.user?.name}</p>
            <p>{pet.user?.email}</p>

            {pet.adopted && pet.adopter && (
              <>
                <h3 className="text-xl mt-6 font-semibold text-rose-600">
                  Adotado por
                </h3>
                <p>{pet.adopter.name}</p>
                <p>{pet.adopter.email}</p>
              </>
            )}

            {isOwner && (
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-rose-500 text-white p-3 rounded-full font-semibold shadow hover:bg-rose-600 transition"
                >
                  Editar Pet
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full bg-red-500 text-white p-3 rounded-full font-semibold shadow hover:bg-red-600 transition"
                >
                  Excluir Pet
                </button>
              </div>
            )}

            {canAdopt && (
              <button
                onClick={handleAdopt}
                className="mt-6 w-full bg-rose-500 text-white p-3 rounded-full font-semibold shadow hover:bg-rose-600 transition"
              >
                Adotar Pet
              </button>
            )}
          </>
        )}

        {isEditing && (
          <form className="space-y-4 mt-4" onSubmit={handleSaveEdit}>
            <div>
              <input
                name="name"
                placeholder="Nome do Pet"
                className="input-rose"
                value={editForm.name}
                onChange={handleEditChange}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="age"
                type="number"
                placeholder="Idade (0 a 25)"
                className="input-rose"
                value={editForm.age}
                onChange={handleEditChange}
              />
              {errors.age && (
                <p className="text-red-600 text-sm">{errors.age}</p>
              )}
            </div>

            <div>
              <input
                name="type"
                placeholder="Tipo (gato, cachorro...)"
                className="input-rose"
                value={editForm.type}
                onChange={handleEditChange}
              />
              {errors.type && (
                <p className="text-red-600 text-sm">{errors.type}</p>
              )}
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Descrição"
                className="input-rose h-24 resize-none"
                value={editForm.description}
                onChange={handleEditChange}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-1/2 bg-gray-400 text-white p-3 rounded-full font-semibold shadow hover:bg-gray-500 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-1/2 bg-rose-500 text-white p-3 rounded-full font-semibold shadow hover:bg-rose-600 transition"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
