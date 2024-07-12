import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import settingsSlice from './slices/settingsSlice';
import rootSaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    settings: settingsSlice,
  },
  // Add the saga middleware to the default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Define RootState type from the store's state
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type from the store's dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
