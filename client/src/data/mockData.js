export const categories = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Fashion", slug: "fashion" },
  { id: 3, name: "Home & Kitchen", slug: "home-kitchen" },
  { id: 4, name: "Books", slug: "books" }
];

export const products = [
  { id: 1, slug: "pulse-x-wireless-headphones", name: "Pulse X Wireless Headphones", brand: "SonicWave", categorySlug: "electronics", categoryName: "Electronics", description: "Immersive over-ear headphones with hybrid ANC and 30-hour battery life.", price: 1500, discountPercent: 15, stock: 44, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", rating: 4.7, reviewCount: 126, featured: true },
  { id: 2, slug: "nova-smartwatch-pro", name: "Nova Smartwatch Pro", brand: "Nova", categorySlug: "electronics", categoryName: "Electronics", description: "AMOLED smartwatch with wellness tracking, GPS, and quick-charge support.", price: 1800, discountPercent: 10, stock: 30, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", rating: 4.5, reviewCount: 98, featured: true },
  { id: 3, slug: "aurora-street-sneakers", name: "Aurora Street Sneakers", brand: "Stride", categorySlug: "fashion", categoryName: "Fashion", description: "Breathable lifestyle sneakers built for all-day wear.", price: 1200, discountPercent: 12, stock: 62, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", rating: 4.4, reviewCount: 77, featured: false },
  { id: 4, slug: "chefstone-cookware-set", name: "Chefstone Cookware Set", brand: "Chefstone", categorySlug: "home-kitchen", categoryName: "Home & Kitchen", description: "8-piece non-stick cookware set with induction-ready base.", price: 2000, discountPercent: 20, stock: 18, imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80", rating: 4.8, reviewCount: 53, featured: true },
  { id: 5, slug: "atomic-habits", name: "Atomic Habits", brand: "Penguin", categorySlug: "books", categoryName: "Books", description: "A practical guide to building good habits and breaking bad ones.", price: 300, discountPercent: 5, stock: 120, imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80", rating: 4.9, reviewCount: 214, featured: false },
  { id: 6, slug: "linen-luxe-bedding", name: "Linen Luxe Bedding", brand: "Nestly", categorySlug: "home-kitchen", categoryName: "Home & Kitchen", description: "Cooling premium bedding set with soft-washed linen comfort.", price: 1600, discountPercent: 18, stock: 26, imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80", rating: 4.6, reviewCount: 68, featured: true }
];

export const reviews = {
  1: [
    { id: 1, name: "Ava Shopper", rating: 5, comment: "Excellent soundstage and battery life." },
    { id: 2, name: "James Holt", rating: 4, comment: "Very comfortable for long work sessions." }
  ],
  2: [{ id: 3, name: "Mila Reed", rating: 4, comment: "Health tracking is surprisingly accurate." }]
};

export const dashboardStats = {
  summary: { totalSales: 500000, totalUsers: 1284, totalInventory: 934 },
  charts: [
    { month: "Jan", sales: 40000, users: 80, inventory: 420 },
    { month: "Feb", sales: 55000, users: 100, inventory: 398 },
    { month: "Mar", sales: 65000, users: 124, inventory: 377 },
    { month: "Apr", sales: 75000, users: 145, inventory: 356 },
    { month: "May", sales: 90000, users: 163, inventory: 332 },
    { month: "Jun", sales: 100000, users: 177, inventory: 318 }
  ],
  lowStock: [
    { id: 4, name: "Chefstone Cookware Set", stock: 18 },
    { id: 6, name: "Linen Luxe Bedding", stock: 26 }
  ]
};
