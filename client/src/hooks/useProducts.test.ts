// src/hooks/useProducts.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts, ProductFilters } from './useProducts';
import * as productsApi from '@/api/products';
import { Product } from '@/types/products';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// Mock the products API module
jest.mock('@/api/products');

describe('useProducts hook', () => {
  const mockProducts: Product[] = [
    {
      shop_id: 1,
      shop_name: 'Test Shop 1',
      shop_type: 'mall',
      shop_link: 'https://shopee.co.th/shop/1',
      shop_image: 'https://example.com/image1.jpg',
      shop_banner: [],
      offer_name: 'Shopee TH - CPS',
      country: 'Thailand',
      period_start_time: '2025-01-01',
      period_end_time: null,
      commission_rate: '0.5',
      tracking_link: 'https://example.com/track1',
    },
    {
      shop_id: 2,
      shop_name: 'Test Shop 2',
      shop_type: 'flagship',
      shop_link: 'https://shopee.co.th/shop/2',
      shop_image: 'https://example.com/image2.jpg',
      shop_banner: [],
      offer_name: 'Shopee TH - CPS',
      country: 'Thailand',
      period_start_time: '2025-01-05',
      period_end_time: null,
      commission_rate: '0.6',
      tracking_link: 'https://example.com/track2',
    },
  ];

  const mockGetProductsApi = productsApi.getProductsApi as jest.Mock;

  beforeEach(() => {
    mockGetProductsApi.mockReset();
  });

  it('should fetch products successfully', async () => {
    // Arrange: mock API response
    mockGetProductsApi.mockResolvedValue({
      data: {
        data: {
          data: mockProducts,
        },
      },
    });

    const filters: ProductFilters = {
      shop_type: 'mall',
      shop_name: '',
      sort_type: '',
      country: ''
    };

    // Act: render the hook
    const { result } = renderHook(() => useProducts(filters));

    // Assert: wait for hook to update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(mockGetProductsApi).toHaveBeenCalledWith({
      shop_name: '',
      shop_type: 'mall',
      sort_type: '',
      country: '',
    });
  });

  it('should handle API failure', async () => {
    mockGetProductsApi.mockRejectedValue(new Error('API error'));

    const filters: ProductFilters = {
      shop_name: '',
      shop_type: '',
      sort_type: '',
      country: ''
    };

    const { result } = renderHook(() => useProducts(filters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch products');
  });
});
