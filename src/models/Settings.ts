import { supabase } from '@/config/supabaseClient';
import { Address } from './Address';

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
  billing_address_id: string;
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
      .from('settings')
      .select<any,Settings>('*')
      .eq('user_id', userId)
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
    .from('settings')
    .update<Partial<Settings>>(settings)
    .eq('id', settings.id)
    .single();

  if (error) {
    console.error('Error updating user settings:', error);
    return null;
  }
  return data;
};

// Fetch billing details by user ID
export const getBillingDetails = async (userId: string): Promise<{ billingDetails: BillingDetails, address: Address | null } | null> => {
  try {
    const { data: billingDetails, error: billingError } = await supabase
      .from('billing_details')
      .select<any,BillingDetails>('*')
      .eq('user_id', userId)
      .single();

    if (billingError) {
      console.error('Error fetching billing details:', billingError);
      return null;
    }

    if (!billingDetails) {
      return null;
    }

    let billingAddress: Address | null = null;

    if (billingDetails.billing_address_id) {
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .select<any,Address>('*')
        .eq('id', billingDetails.billing_address_id)
        .single();

      if (addressError) {
        console.error('Error fetching billing address:', addressError);
        return { billingDetails, address: null };
      }

      billingAddress = addressData;
    }

    return { billingDetails, address: billingAddress };
  } catch (e) {
    console.error('Exception fetching billing details:', e);
    return null;
  }
};

// Update billing details
export const updateBillingDetails = async (details: Partial<BillingDetails>): Promise<BillingDetails | null> => {
  const { data, error } = await supabase
    .from('billing_details')
    .update<Partial<BillingDetails>>(details)
    .eq('id', details.id)
    .single();

  if (error) {
    console.error('Error updating billing details:', error);
    return null;
  }
  return data;
};
