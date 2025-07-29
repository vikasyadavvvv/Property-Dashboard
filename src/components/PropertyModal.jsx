import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';
import { currency } from '../utils/format';

export default function PropertyModal() {
  const { selected, setSelected } = useProperties();

  useEffect(() => {
    const onEsc = e => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [setSelected]);

  if (!selected) return null;

  const mapUrl = selected.coords
    ? `https://www.google.com/maps?q=${selected.coords.lat},${selected.coords.lng}&hl=en&z=14&output=embed`
    : null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
      <div className="absolute inset-x-0 top-10 mx-auto w-[95%] max-w-3xl rounded-2xl border bg-white p-4 shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold dark:text-white">View Details</h3>
          <button onClick={() => setSelected(null)} className="px-2 py-1 rounded border dark:border-zinc-700 dark:text-white">✕</button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
          <img src={selected.image} alt={selected.name} className="w-full h-56 object-cover rounded-lg" />

          <div>
            <div className="font-semibold dark:text-white">{selected.name}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {selected.type} · {selected.location}
            </div>
            <div className="mt-1 font-semibold dark:text-white">{currency(selected.price)}</div>
            <p className="mt-3 text-sm dark:text-white">{selected.description}</p>
          </div>
        </div>

        {mapUrl && (
          <div className="mt-4 h-64 rounded-lg overflow-hidden">
            <iframe title="map" src={mapUrl} className="w-full h-full border-0" loading="lazy" />
          </div>
        )}

        <div className="mt-4 text-right">
          <button onClick={() => setSelected(null)} className="px-4 py-2 rounded bg-blue-600 text-white">Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
