import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
  fetchUserDetailsFailure,
  fetchUserDetailsSuccess
} from '../slices/authSlice';
import { signInWithPassword, signUp, signOut, getSession, getUserDetails } from '@/services/authService';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/User';

function* handleSignIn(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(signInWithPassword, email, password);
    yield put(signInSuccess(user));
  } catch (error: any) {
    yield put(signInFailure(error.message));
  }
}

function* handleSignUp(action: PayloadAction<{ email: string; password: string; firstName: string; lastName: string }>) {
  try {
    const { email, password, firstName, lastName } = action.payload;
    const user: User = yield call(signUp, email, password, firstName, lastName);
    yield put(signUpSuccess(user));
  } catch (error: any) {
    yield put(signUpFailure(error.message));
  }
}

function* handleSignOut() {
  try {
    yield call(signOut);
    yield put(signOutSuccess());
  } catch (error: any) {
    yield put(signOutFailure(error.message));
  }
}

function* handleFetchSession() {
  try {
    const user: User = yield call(getSession); //todo: change to type session
    yield put(fetchSessionSuccess(user));
  } catch (error: any) {
    yield put(fetchSessionFailure(error.message));
  }
}

function* handleFetchUserDetails(action: PayloadAction<{userId: any|string}>){
  try{
    const userId = action.payload;
    const user:User = yield call(getUserDetails,userId);
    yield put(fetchUserDetailsSuccess(user));
  }catch(error:any){
    yield put(fetchUserDetailsFailure(error.message));
  }
}


export function* watchSignIn() {
  yield takeLatest(signInStart.type, handleSignIn);
}

export function* watchSignUp() {
  yield takeLatest(signUpStart.type, handleSignUp);
}

export function* watchSignOut() {
  yield takeLatest(signOutStart.type, handleSignOut);
}

export function* watchFetchSession() {
  yield takeLatest(fetchSessionStart.type, handleFetchSession);
}

export function* watchFetchUserDetails(){
  yield takeLatest(fetchUserDetailsStart.type,handleFetchUserDetails);
}
