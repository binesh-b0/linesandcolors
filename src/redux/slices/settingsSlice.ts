import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings, BillingDetails } from '@/models/Settings';
import {User} from '@/models/User'

interface SettingsState {
  settings: Settings | null;
  billingDetails: BillingDetails | null;
  secLoading: boolean; // Not fullscreen loadings 
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  billingDetails: null,
  secLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    fetchSettingsStart: (state) => {
      state.secLoading = true;
    },
    fetchSettingsSuccess: (state, action: PayloadAction<Settings>) => {
      state.secLoading = false;
      state.settings = action.payload;
    },
    fetchSettingsFailure: (state, action: PayloadAction<string>) => {
      state.secLoading = false;
      state.error = action.payload;
    },
    updateSettingsStart: (state) => {
      state.secLoading = true;
    },
    updateSettingsSuccess: (state, action: PayloadAction<Settings>) => {
      state.secLoading = false;
      state.settings = action.payload;
    },
    updateSettingsFailure: (state, action: PayloadAction<string>) => {
      state.secLoading = false;
      state.error = action.payload;
    },
    fetchBillingDetailsStart: (state) => {
      state.secLoading = true;
    },
    fetchBillingDetailsSuccess: (state, action: PayloadAction<BillingDetails>) => {
      state.secLoading = false;
      state.billingDetails = action.payload;
    },
    fetchBillingDetailsFailure: (state, action: PayloadAction<string>) => {
      state.secLoading = false;
      state.error = action.payload;
    },
    updateBillingDetailsStart: (state) => {
      state.secLoading = true;
    },
    updateBillingDetailsSuccess: (state, action: PayloadAction<BillingDetails>) => {
      state.secLoading = false;
      state.billingDetails = action.payload;
    },
    updateBillingDetailsFailure: (state, action: PayloadAction<string>) => {
      state.secLoading = false;
      state.error = action.payload;
    },
    fetchUserDetailsStart: (state) => {
      state.secLoading = true;
    },
    fetchUserDetailsSuccess: (state, action: PayloadAction<User>) => {
      state.secLoading = false;
      state.user = action.payload;
    },
    fetchUserDetailsFailure: (state, action: PayloadAction<string>) => {
      state.secLoading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchSettingsStart,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailure,
  fetchBillingDetailsStart,
  fetchBillingDetailsSuccess,
  fetchBillingDetailsFailure,
  updateBillingDetailsStart,
  updateBillingDetailsSuccess,
  updateBillingDetailsFailure,
} = settingsSlice.actions;

export default settingsSlice.reducer;
