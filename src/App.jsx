import React from 'react';
import Header from './components/Header';
import PropertyGrid from './components/PropertyGrid';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyModal from './components/PropertyModal';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl p-4 space-y-6">
        <Header />
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Property Listings</h2>
          <PropertyGrid />
        </section>
        <section>
          <AddPropertyForm />
        </section>
      </div>
      <PropertyModal />
    </div>
  );
}
