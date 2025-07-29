import React from 'react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from './PropertyCard';

export default function PropertyGrid() {
  const { filtered, loading, error } = useProperties();

  if (loading) return <div className="py-10 text-center">Loading properties…</div>;
  if (error) return <div className="py-10 text-center text-red-600">Error: {error}</div>;
  if (!filtered.length) return <div className="py-10 text-center">No properties found.</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
    </div>
  );
}
