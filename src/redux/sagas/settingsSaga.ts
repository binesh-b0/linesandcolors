import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/settingsSlice';
import { getUserSettings, updateUserSettings, getBillingDetails, updateBillingDetails } from '@/models/Settings';
import { PayloadAction } from '@reduxjs/toolkit';


function* handleFetchSettings(action: PayloadAction<{userId: string}>) {
  try {
    const userId = action.payload;
    const settings = yield call(getUserSettings, userId);
    yield put(fetchSettingsSuccess(settings));
  } catch (error: any) {
    yield put(fetchSettingsFailure(error.message));
  }
}

function* handleUpdateSettings(action: PayloadAction<Partial<Settings>>) {
  try {
    const { old_settings } = action.payload;
    const new_settings = yield call(updateUserSettings, old_settings);
    yield put(updateSettingsSuccess(new_settings));
  } catch (error: any) {
    yield put(updateSettingsFailure(error.message));
  }
}

function* handleFetchBillingDetails(action: PayloadAction<string>) {
  try {
    const details = yield call(getBillingDetails, action.payload);
    yield put(fetchBillingDetailsSuccess(details));
  } catch (error: any) {
    yield put(fetchBillingDetailsFailure(error.message));
  }
}

function* handleUpdateBillingDetails(action: PayloadAction<Partial<BillingDetails>>) {
  try {
    const details = yield call(updateBillingDetails, action.payload);
    yield put(updateBillingDetailsSuccess(details));
  } catch (error: any) {
    yield put(updateBillingDetailsFailure(error.message));
  }
}

export function* watchFetchSettings() {
  yield takeLatest(fetchSettingsStart.type, handleFetchSettings);
}

export function* watchUpdateSettings() {
  yield takeLatest(updateSettingsStart.type, handleUpdateSettings);
}

export function* watchFetchBillingDetails() {
  yield takeLatest(fetchBillingDetailsStart.type, handleFetchBillingDetails);
}

export function* watchUpdateBillingDetails() {
  yield takeLatest(updateBillingDetailsStart.type, handleUpdateBillingDetails);
}
