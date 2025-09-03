// src/hooks/useProducts.ts

import { useState, useEffect } from 'react';
import { getProductsApi } from '@/api/products';
import { Product } from '@/types/products';

export interface ProductFilters {
  shop_name: string;
  shop_type: 'mall' | 'preferred' | '';
  sort_type: 'latest_updated' | 'high_commission' | '';
  country: 'Malaysia' | 'Singapore' | 'Indonesia' | 'Thailand' | 'Vietnam' | 'Philippines' | 'Taiwan' | '';
}

export const useProducts = (filters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Map the filters to API parameters
        const params = {
          shop_name: filters.shop_name,
          shop_type: filters.shop_type,
          sort_type: filters.sort_type,
          country: filters.country,
        };
        const res = await getProductsApi(params);
        setProducts(res.data.data.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]); // Rerun the effect whenever filters change

  return { products, loading, error };
};