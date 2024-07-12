import { supabase } from '@/config/supabaseClient';

// Define the Settings interface
export interface Settings {
  id: string;
  user_id: string;
  dark_mode: boolean;
  email_updates: boolean;
  sms_notifications: boolean;
  created_at: Date;
  updated_at: Date;
}

// Define the BillingDetails interface
export interface BillingDetails {
  id: string;
  user_id: string;
  billin_address_id: string;
  payment_method: string;
  created_at: Date;
  updated_at: Date;
}

// Fetch user settings by user ID
export const getUserSettings = async (userId: string): Promise<Settings | null> => {
  try {
    // If userId has double quotes, remove them
    if (userId.startsWith('"') && userId.endsWith('"')) {
      userId = userId.slice(1, -1);
    }

    const { data, error } = await supabase
      .from<Settings>('settings')
      .select('*')
      .eq('user_id', userId)  // Use the provided userId variable
      .single();

    if (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Exception fetching user settings:', e);
    return null;
  }
};

// Update user settings
export const updateUserSettings = async (settings: Partial<Settings>): Promise<Settings | null> => {
  const { data, error } = await supabase
    .from<Settings>('settings')
    .update(settings)
    .eq('id', settings.id)
    .single();

  if (error) {
    console.error('Error updating user settings:', error);
    return null;
  }
  return data;
};

// Fetch billing details by user ID
export const getBillingDetails = async (userId: string): Promise<BillingDetails | null> => {
  const { data, error } = await supabase
    .from<BillingDetails>('billing_details')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching billing details:', error);
    return null;
  }
  return data;
};

// Update billing details
export const updateBillingDetails = async (details: Partial<BillingDetails>): Promise<BillingDetails | null> => {
  const { data, error } = await supabase
    .from<BillingDetails>('billing_details')
    .update(details)
    .eq('id', details.id)
    .single();

  if (error) {
    console.error('Error updating billing details:', error);
    return null;
  }
  return data;
};
