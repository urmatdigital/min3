import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export function useSupabaseQuery<T>(
  key: string[],
  query: () => PostgrestFilterBuilder<any, any, T[]>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await query();
      if (error) throw error;
      return data;
    },
  });
}