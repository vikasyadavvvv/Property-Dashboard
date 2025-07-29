import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProperties } from '../api/properties';

const PropertyContext = createContext(null);
export const useProperties = () => useContext(PropertyContext);

export default function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const [selected, setSelected] = useState(null);

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dark');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchProperties();
        if (mounted) setProperties(data);
      } catch (e) {
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const addProperty = (p) => {
    setProperties(prev => {
      const nextId = prev.length ? Math.max(...prev.map(x => x.id)) + 1 : 1;
      return [...prev, { ...p, id: nextId }];
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter(p => {
      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesType && matchesQ;
    });
  }, [properties, query, typeFilter]);

  const types = useMemo(() => ['All', ...Array.from(new Set(properties.map(p => p.type)))], [properties]);

  const value = {
    loading, error,
    properties, filtered, types,
    query, setQuery,
    typeFilter, setTypeFilter,
    selected, setSelected,
    addProperty,
    dark, setDark
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}
