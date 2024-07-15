import { supabase } from '@/config/supabaseClient';

export interface Address {
  id: string;
  user_id: string;
  title: string;
  address_line_1: string;
  address_line_2?: string;
  country: string;
  city: string;
  postal_code: string;
  landmark?: string;
  phone_number: string;
  created_at: Date;
  deleted_at?: Date | null;
}

export class AddressModel {
  /**
   * Fetch all addresses for a specific user.
   * @param userId - User ID.
   * @returns A list of address objects.
   */
  static async getAddressesByUserId(userId: string): Promise<Address[]> {
    const { data, error } = await supabase
      .from<any, Address>('addresses')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null);

    if (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }

    return data as Address[];
  }

  /**
   * Fetch a single address by ID.
   * @param id - Address ID.
   * @returns The address object or null if not found.
   */
  static async getAddressById(id: string): Promise<Address | null> {
    const { data, error } = await supabase
      .from<any, Address>('addresses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching address:', error);
      return null;
    }

    return data as Address | null;
  }

  /**
   * Create a new address.
   * @param address - Partial address object.
   * @returns The created address object.
   */
  static async createAddress(address: Partial<Address>): Promise<Address | null> {
    const { data, error } = await supabase
      .from<string, Address>('addresses')
      .insert(address as Address | any)
      .single();

    if (error) {
      console.error('Error creating address:', error);
      return null;
    }

    return data as Address | null;
  }

  /**
   * Update an existing address.
   * @param id - Address ID.
   * @param updates - Partial address object containing updates.
   * @returns The updated address object or null if update failed.
   */
  static async updateAddress(id: string, updates: Partial<Address>): Promise<Address | null> {
    const { data, error } = await supabase
      .from('addresses')
      .update(updates as Address)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating address:', error);
      return null;
    }

    return data as Address | null;
  }

  /**
   * Soft delete an address by ID.
   * @param id - Address ID.
   * @returns void.
   */
  static async deleteAddress(id: string): Promise<void> {
    const { error } = await supabase
      .from<any, Address>('addresses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
    return;
  }
}
