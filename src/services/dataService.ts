import { supabase } from '../config/supabaseClient';

export const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  return { data, error };
};

export const fetchProducts = async (categoryId: number) => {
  const { data, error } = await supabase.from('products').select('*').eq('category_id', categoryId);
  return { data, error };
};
