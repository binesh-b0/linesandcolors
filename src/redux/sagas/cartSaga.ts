import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/cartSlice';
import { getCartById, getCartItemsByCartId, createCartItem, deleteCartItem } from '@/services/cartService';
import { PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@/models/Cart';

function* handleFetchCart(action: PayloadAction<string>) {
  try {
    const cart: Cart = yield call(getCartById, action.payload);
    yield put(fetchCartSuccess(cart));
  } catch (error: any) {
    yield put(fetchCartFailure(error.message));
  }
}

function* handleFetchCartItems(action: PayloadAction<string>) {
  try {
    const items: CartItem[] = yield call(getCartItemsByCartId, action.payload);
    yield put(fetchCartItemsSuccess(items));
  } catch (error: any) {
    yield put(fetchCartItemsFailure(error.message));
  }
}

function* handleAddItem(action: PayloadAction<Partial<CartItem>>) {
  try {
    const item: CartItem = yield call(createCartItem, action.payload);
    yield put(addItemSuccess(item));
  } catch (error: any) {
    yield put(addItemFailure(error.message));
  }
}

function* handleRemoveItem(action: PayloadAction<string>) {
  try {
    yield call(deleteCartItem, action.payload);
    yield put(removeItemSuccess(action.payload));
  } catch (error: any) {
    yield put(removeItemFailure(error.message));
  }
}

export function* watchFetchCart() {
  yield takeLatest(fetchCartStart.type, handleFetchCart);
}

export function* watchFetchCartItems() {
  yield takeLatest(fetchCartItemsStart.type, handleFetchCartItems);
}

export function* watchAddItem() {
  yield takeLatest(addItemStart.type, handleAddItem);
}

export function* watchRemoveItem() {
  yield takeLatest(removeItemStart.type, handleRemoveItem);
}
