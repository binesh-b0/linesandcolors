import { all, fork } from 'redux-saga/effects';
import {
  watchSignIn,
  watchSignUp,
  watchFetchSession,
  watchSignOut,
  watchFetchUserDetails
} from './authSaga';
import {
  watchFetchCart,
  watchFetchCartItems,
  watchAddItem,
  watchRemoveItem,
} from './cartSaga';
import { watchFetchSettings, watchUpdateSettings, watchFetchBillingDetails, watchUpdateBillingDetails } from './settingsSaga';


export default function* rootSaga() {
  yield all([
    fork(watchSignIn),fork(watchSignUp),fork(watchSignOut),
    fork(watchFetchSession),
    fork(watchFetchUserDetails),
    fork(watchFetchCart),fork(watchFetchCartItems),fork(watchAddItem),fork(watchRemoveItem),
    fork(watchFetchSettings),fork(watchUpdateSettings),
    fork(watchFetchBillingDetails),fork(watchUpdateBillingDetails),
  ]);
}
