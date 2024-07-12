import { supabase } from '../config/supabaseClient';

export const uploadFile = async (path: string, file: File) => {
  const { data, error } = await supabase.storage.from('uploads').upload(path, file);
  return { data, error };
};

export const getFileUrl = (path: string) => {
const { data: publicURL } = supabase.storage.from('uploads').getPublicUrl(path);
  return publicURL;
};
