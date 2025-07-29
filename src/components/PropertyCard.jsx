import React from 'react';
import { currency } from '../utils/format';
import { useProperties } from '../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { setSelected } = useProperties();
  const { name, type, price, location, description } = property;

  return (
    <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-200">
      <div className="font-semibold text-zinc-900 dark:text-white">{name}</div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        {type} · {location}
      </div>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
        {description}
      </p>
      <div className="mt-3 font-semibold text-zinc-900 dark:text-white">
        {currency(price)}
      </div>
      <div className="mt-3">
        <button
          onClick={() => setSelected(property)}
          className="px-3 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          View
        </button>
      </div>
    </div>
  );
}
