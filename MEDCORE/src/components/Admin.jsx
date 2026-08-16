import { useState, useId } from "react";
import { useMedications } from "../MedicationsContext";

function Admin() {
  const { medications, addMedication, updateMedication } = useMedications();
  const [form, setForm] = useState({ name: "", description: "", category: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const nameId = useId();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      updateMedication(editingId, form);
      setEditingId(null);
    } else {
      addMedication(form);
    }
    setForm({ name: "", description: "", category: "", price: "" });
  }

  function startEdit(med) {
    setForm({ name: med.name, description: med.description, category: med.category, price: med.price });
    setEditingId(med.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-700 drop-shadow-sm">
           Admin Portal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border-4 border-purple-200"
        >
          <div>
            <label htmlFor={nameId} className="block text-sm font-semibold text-purple-600 mb-1">
              Medication Name
            </label>
            <input
              id={nameId}
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-600 mb-1">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-600 mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-600 mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2.5 rounded-lg shadow-md transition transform hover:scale-105"
          >
            {editingId ? "✏️ Update Medication" : "➕ Submit"}
          </button>
        </form>

        <div className="mt-8 space-y-3">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex justify-between items-center bg-white rounded-xl shadow-sm px-4 py-3 border-l-4 border-yellow-400"
            >
              <div>
                <p className="font-semibold text-gray-800">{med.name}</p>
                <p className="text-xs text-gray-500">{med.category} · ${med.price}</p>
              </div>
              <button
                onClick={() => startEdit(med)}
                className="text-xs font-semibold text-pink-500 hover:text-pink-700 bg-pink-50 px-3 py-1 rounded-full transition"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;