import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/User';

interface AuthState {
  user: User | null;
  session:any;
  loading: boolean;
  secLoading:boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {email:'',},
  loading: false,
  secLoading:false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.secLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.session = action.payload;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpStart: (state) => {
      state.loading = true;
      state.secLoading = true;
    },
    signUpSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.session = action.payload;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.secLoading = true;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.session = null;
      state.user = null;
    },
    signOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSessionStart: (state) => {
      state.loading = true;
      state.secLoading = true;
    },
    fetchSessionSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.session = action.payload
    },
    fetchSessionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
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
    // user details was moved to settingsSlice to use secLoading
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  fetchSessionStart,
  fetchSessionSuccess,
  fetchSessionFailure,
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure
} = authSlice.actions;

export default authSlice.reducer;
