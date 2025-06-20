"use client";
import { useState } from "react";

export default function CoffeeForm({ onCoffeeAdded }) {
  const [formData, setFormData] = useState({
    cname: "",
    price: "",
    category: "coffee",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/coffees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newCoffee = await res.json();
      setFormData({ cname: "", price: "", category: "coffee" });
      if (onCoffeeAdded) {
        onCoffeeAdded(newCoffee); // optional manual update
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Tambah Kopi Baru</h2>

      <input
        name="cname"
        placeholder="Nama Kopi"
        className="border p-2 mb-2 w-full"
        value={formData.cname}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Harga"
        className="border p-2 mb-2 w-full"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        className="border p-2 mb-4 w-full"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="coffee">Coffee</option>
        <option value="non-coffee">Non-Coffee</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Tambah
      </button>
    </form>
  );
}
