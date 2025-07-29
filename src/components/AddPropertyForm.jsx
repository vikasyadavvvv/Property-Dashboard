import React from 'react';
import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';

const TYPES = ['Plot', 'Retail', 'Shed', 'Office', 'Warehouse'];

export default function AddPropertyForm() {
  const { addProperty } = useProperties();
  const [form, setForm] = useState({
    name: '',
    type: 'Plot',
    price: '',
    location: '',
    description: '',
    image: '',
    lat: '',
    lng: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const priceNum = Number(form.price);
    if (!form.name || !form.location || !form.description || !priceNum) return;

    const coords = (form.lat && form.lng) ? { lat: Number(form.lat), lng: Number(form.lng) } : undefined;

    addProperty({
      name: form.name.trim(),
      type: form.type,
      price: priceNum,
      location: form.location.trim(),
      description: form.description.trim(),
      image: form.image || 'https://images.unsplash.com/photo-1501183638710-841dd1904471',
      coords
    });

    setForm({ name:'', type:'Plot', price:'', location:'', description:'', image:'', lat:'', lng:'' });
  };

  return (
    <form onSubmit={submit} className={`rounded-xl border p-4 bg-white dark:bg-zinc-900 dark:border-zinc-800`}>
      <h3 className="text-lg font-semibold mb-3">Add Property</h3>

      <div className="grid gap-3 md:grid-cols-2">
        <input name="name" value={form.name} onChange={onChange} placeholder="Property Name" className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900" />

        <select name="type" value={form.type} onChange={onChange} className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900">
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <input name="price" value={form.price} onChange={onChange} placeholder="Price (USD)" type="number" className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900" />

        <input name="location" value={form.location} onChange={onChange} placeholder="Location" className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900" />

        <input name="image" value={form.image} onChange={onChange} placeholder="Image URL (optional)" className="px-3 py-2 rounded border md:col-span-2 dark:border-zinc-700 dark:bg-zinc-900" />

        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" rows={3} className="px-3 py-2 rounded border md:col-span-2 dark:border-zinc-700 dark:bg-zinc-900" />

        <input name="lat" value={form.lat} onChange={onChange} placeholder="Latitude (optional)" className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900" />
        <input name="lng" value={form.lng} onChange={onChange} placeholder="Longitude (optional)" className="px-3 py-2 rounded border dark:border-zinc-700 dark:bg-zinc-900" />
      </div>

      <button className="mt-4 w-full md:w-auto px-4 py-2 rounded bg-blue-600 text-white">Submit</button>
    </form>
  );
}
