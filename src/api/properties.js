export async function fetchProperties() {
  // Simulate a real API (network latency)
  const res = await fetch('/properties.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch properties');
  const data = await res.json();
  // Small delay to show loading state
  await new Promise(r => setTimeout(r, 400));
  return data;
}
