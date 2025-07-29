import React from 'react';
import { useProperties } from '../context/PropertyContext';

export default function Header() {
  const { query, setQuery, typeFilter, setTypeFilter, types, dark, setDark } = useProperties();

  const inputId = 'property-search';
  const selectId = 'type-filter';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <h1 className="text-lg sm:text-2xl font-semibold truncate">
        Mini Property Listing Dashboard
      </h1>

      {/* Controls */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="w-full sm:w-auto">
          <label htmlFor={inputId} className="sr-only">Search</label>
          <input
            id={inputId}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, type, location..."
            className="w-full sm:w-72 md:w-80 px-3 py-2 rounded border outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor={selectId} className="sr-only">Filter by type</label>
          <select
            id={selectId}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 rounded border outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setDark((v) => !v)}
          className="w-full sm:w-auto px-3 py-2 rounded border outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
}

