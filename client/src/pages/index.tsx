import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useProducts, ProductFilters } from '@/hooks/useProducts';
import Head from 'next/head';
import { Product } from '@/types/products';

// Updated ProductCard component
const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-start space-y-2">
    {product.shop_image && (
      <img
        src={product.shop_image}
        alt={product.shop_name}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
    )}
    <h3 className="text-xl font-semibold">{product.shop_name}</h3>
    <p className="text-gray-600">
      <span className="font-medium">Commission Rate:</span> {product.commission_rate}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Shop Type:</span> {product.shop_type}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Country:</span> {product.country}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Period:</span> {product.period_start_time} to {product.period_end_time || 'N/A'}
    </p>
    <a
      href={product.tracking_link}
      className="text-blue-500 hover:underline mt-4 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to Shop
    </a>
  </div>
);

const ProductFeedPage = () => {
  const { getIsAuthenticated } = useAuth();
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a single useEffect to handle all auth logic
  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuth = getIsAuthenticated();
      setIsAuthenticated(isAuth);
      setLoading(false);
      if (!isAuth) {
        router.push('/auth/login');
      }
    };
    
    // Initial check on client-side mount
    checkAuthStatus();
    
    // Listen for custom events to update state after login/logout
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('auth-status-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-status-changed', handleAuthChange);
    };
  }, [getIsAuthenticated, router]);
  
  const [filters, setFilters] = useState<ProductFilters>({
    shop_name: '',
    shop_type: '',
    sort_type: 'high_commission',
    country: '',
  });

  const { products, loading: productsLoading, error } = useProducts(filters);

  // If we are still loading, show a consistent UI for both server and client
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  
  // If not authenticated, return null as the router has already pushed to login
  if (!isAuthenticated) {
    return null;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Product Feed</title>
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8">Product Feed</h1>
      
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Shop Name</label>
          <input
            type="text"
            name="shop_name"
            value={filters.shop_name}
            onChange={handleFilterChange}
            placeholder="e.g., Mobile"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Shop Type</label>
          <select
            name="shop_type"
            value={filters.shop_type}
            onChange={handleFilterChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">All</option>
            <option value="mall">Mall</option>
            <option value="preferred">Preferred</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Sort By</label>
          <select
            name="sort_type"
            value={filters.sort_type}
            onChange={handleFilterChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="high_commission">High Commission</option>
            <option value="latest_updated">Latest Updated</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">All</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Thailand">Thailand</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Philippines">Philippines</option>
            <option value="Taiwan">Taiwan</option>
          </select>
        </div>
      </div>

      {productsLoading ? (
        <div className="text-center mt-8">Loading products...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.shop_id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductFeedPage;