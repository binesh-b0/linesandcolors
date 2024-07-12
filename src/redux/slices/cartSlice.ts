import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@/models/Cart';

interface CartState {
  cart: Cart | null;
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart: (state) => {
      state.loading = true;
    },
    fetchCartSuccess: (state, action: PayloadAction<Cart>) => {
      state.loading = false;
      state.cart = action.payload;
    },
    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCartItemsStart: (state) => {
      state.loading = true;
    },
    fetchCartItemsSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCartItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addItemStart: (state) => {
      state.loading = true;
    },
    addItemSuccess: (state, action: PayloadAction<CartItem>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    addItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemStart: (state) => {
      state.loading = true;
    },
    removeItemSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  fetchCartItemsStart,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
  addItemStart,
  addItemSuccess,
  addItemFailure,
  removeItemStart,
  removeItemSuccess,
  removeItemFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
