// src/models/Cart.ts
import { supabase } from '@/config/supabaseClient';

export interface Cart {
  id: string;
  user_id: string;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  products_sku_id?: string | null;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export class CartModel {
  /**
   * Fetch a cart by ID.
   * @param id - Cart ID.
   * @returns The cart object or null if not found.
   */
  static async getCartById(id: string): Promise<Cart | null> {
    const { data, error } = await supabase
      .from<Cart>('cart')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
    return data;
  }

  /**
   * Create a new cart.
   * @param cart - Partial cart object.
   * @returns The created cart object or null if creation failed.
   */
  static async createCart(cart: Partial<Cart>): Promise<Cart | null> {
    const { data, error } = await supabase
      .from<Cart>('cart')
      .insert(cart)
      .single();

    if (error) {
      console.error('Error creating cart:', error);
      return null;
    }
    return data;
  }

  /**
   * Update a cart's information.
   * @param id - Cart ID.
   * @param updates - Partial cart object containing updates.
   * @returns The updated cart object or null if update failed.
   */
  static async updateCart(id: string, updates: Partial<Cart>): Promise<Cart | null> {
    const { data, error } = await supabase
      .from<Cart>('cart')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating cart:', error);
      return null;
    }
    return data;
  }

  /**
   * Delete a cart by ID.
   * @param id - Cart ID.
   */
  static async deleteCart(id: string): Promise<void> {
    const { error } = await supabase
      .from<Cart>('cart')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting cart:', error);
    }
  }
}

export class CartItemModel {
  /**
   * Fetch cart items by cart ID.
   * @param cartId - Cart ID.
   * @returns A list of cart items.
   */
  static async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from<CartItem>('cart_item')
      .select('*')
      .eq('cart_id', cartId);

    if (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
    return data;
  }

  /**
   * Create a new cart item.
   * @param cartItem - Partial cart item object.
   * @returns The created cart item object or null if creation failed.
   */
  static async createCartItem(cartItem: Partial<CartItem>): Promise<CartItem | null> {
    const { data, error } = await supabase
      .from<CartItem>('cart_item')
      .insert(cartItem)
      .single();

    if (error) {
      console.error('Error creating cart item:', error);
      return null;
    }
    return data;
  }

  /**
   * Update a cart item's information.
   * @param id - Cart item ID.
   * @param updates - Partial cart item object containing updates.
   * @returns The updated cart item object or null if update failed.
   */
  static async updateCartItem(id: string, updates: Partial<CartItem>): Promise<CartItem | null> {
    const { data, error } = await supabase
      .from<CartItem>('cart_item')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating cart item:', error);
      return null;
    }
    return data;
  }

  /**
   * Delete a cart item by ID.
   * @param id - Cart item ID.
   */
  static async deleteCartItem(id: string): Promise<void> {
    const { error } = await supabase
      .from<CartItem>('cart_item')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting cart item:', error);
    }
  }
}
