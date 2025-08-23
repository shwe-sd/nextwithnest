import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useConversions, ConversionFilters } from '@/hooks/useConversions';
import { Conversion } from '@/types/conversions';
import { Button } from '@/components/ui/Button';

// Utility function to format date
const formatDate = (date: Date) => date.toISOString().split('T')[0];

const ConversionsPage = () => {
  const { getIsAuthenticated } = useAuth();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for date filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Use useMemo to memoize the filters object
  const filters: ConversionFilters = useMemo(() => ({
    start_date: startDate, 
    end_date: endDate 
  }), [startDate, endDate]);

  const { conversions, loading: conversionsLoading, error } = useConversions(filters);

  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuth = getIsAuthenticated();
      setIsAuthenticated(isAuth);
      setLoading(false);
      if (!isAuth) {
        router.push('/auth/login');
      }
    };
    
    checkAuthStatus();
    
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('auth-status-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-status-changed', handleAuthChange);
    };
  }, [getIsAuthenticated, router]);

  const handleApplyFilters = () => {
    // No code needed here. The state change triggers the hook.
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const isStartDateInvalid = startDate && endDate && new Date(startDate) > new Date(endDate);
  const isEndDateInvalid = endDate && startDate && new Date(endDate) < new Date(startDate);
  
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Conversions Report</title>
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8">Conversions Report</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!!isStartDateInvalid}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!!isEndDateInvalid}
            min={startDate}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex space-x-2 md:mt-6">
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button onClick={handleClearFilters} className="bg-gray-500 hover:bg-gray-700">Clear</Button>
        </div>
      </div>

      {conversionsLoading ? (
        <div className="text-center mt-8">Loading conversions...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conversions.map((conversion) => (
                <tr key={conversion.conversion_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{conversion.offer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{conversion.sale_amount} {conversion.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{conversion.payout}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{conversion.conversion_status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{conversion.datetime_conversion.split(' ')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ConversionsPage;