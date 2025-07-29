export const currency = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
