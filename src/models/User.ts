// src/models/User.ts
import { supabase } from '@/config/supabaseClient';

export interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  birth_of_date: Date;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export class UserModel {
  /**
   * Fetch a user by ID.
   * @param id - User ID.
   * @returns The user object or null if not found.
   */
  static async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from<User>('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data;
  }

  /**
   * Create a new user.
   * @param user - Partial user object.
   * @returns The created user object or null if creation failed.
   */
  static async createUser(user: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from<User>('users')
      .insert(user)
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }
    return data;
  }

  /**
   * Update a user's information.
   * @param id - User ID.
   * @param updates - Partial user object containing updates.
   * @returns The updated user object or null if update failed.
   */
  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from<User>('users')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }
    return data;
  }

  /**
   * Delete a user by ID.
   * @param id - User ID.
   * @returns void.
   */
  static async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from<User>('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
    }
  }
}
