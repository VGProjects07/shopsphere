import { useMemo } from "react";

export const useFilteredProducts = (products, searchTerm, category) =>
  useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || product.categorySlug === category;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, category]
  );
