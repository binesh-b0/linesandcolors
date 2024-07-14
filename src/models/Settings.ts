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
      .from<Settings>('settings')
      .select('*')
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
export const getBillingDetails = async (userId: string): Promise<{ billingDetails: BillingDetails, address: Address } | null> => {
  try {
    const { data: billingDetails, error: billingError } = await supabase
      .from<BillingDetails>('billing_details')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (billingError) {
      console.error('Error fetching billing details:', billingError);
      return null;
    }
    if(billingDetails?.billing_address_id)
    {const { data: billingAddress, error: addressError } = await supabase
      .from<Address>('addresses')
      .select('*')
      .eq('id', billingDetails.billing_address_id)
      .single();

    if (addressError) {
      console.error('Error fetching billing address:', addressError);
      return null;
    }}
    else
    {
      return {billingDetails, address:null}
    }

    return { billingDetails, address };
  } catch (e) {
    console.error('Exception fetching billing details:', e);
    return null;
  }
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
