import { supabase } from '@/config/supabaseClient';
import { Cart, CartItem } from '@/Models/Cart';

/**
 * Fetch a cart by ID.
 * @param id - Cart ID.
 * @returns The cart object or null if not found.
 * @throws Will throw an error if fetching cart fails.
 */
export const getCartById = async (id: string): Promise<Cart | null> => {
  const { data, error } = await supabase
    .from<Cart>('cart')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Fetch cart items by cart ID.
 * @param cartId - Cart ID.
 * @returns A list of cart items.
 * @throws Will throw an error if fetching cart items fails.
 */
export const getCartItemsByCartId = async (cartId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from<CartItem>('cart_item')
    .select('*')
    .eq('cart_id', cartId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Create a new cart item.
 * @param cartItem - Partial cart item object.
 * @returns The created cart item object or null if creation failed.
 * @throws Will throw an error if creating cart item fails.
 */
export const createCartItem = async (cartItem: Partial<CartItem>): Promise<CartItem | null> => {
  const { data, error } = await supabase
    .from<CartItem>('cart_item')
    .insert(cartItem)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Delete a cart item by ID.
 * @param id - Cart item ID.
 * @throws Will throw an error if deleting cart item fails.
 */
export const deleteCartItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from<CartItem>('cart_item')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
