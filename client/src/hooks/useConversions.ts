import { useState, useEffect } from 'react';
import { getConversionsApi } from '@/api/conversions';
import { Conversion } from '../types/conversions';

export interface ConversionFilters {
  start_date?: string;
  end_date?: string;
}

export const useConversions = (filters: ConversionFilters) => {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getConversionsApi(filters);
        console.log('Conversions fetched:', res.data); // Debugging line
        setConversions(res.data.data.data);
      } catch (err) {
        setError('Failed to fetch conversions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversions();
  }, [filters]); // Re-run effect when filters change

  return { conversions, loading, error };
};