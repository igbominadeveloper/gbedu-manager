import { ReduxAction, SpotifyUser } from '../types';
import * as Actions from './constants';

export const getUserProfileSuccess = (payload: SpotifyUser): ReduxAction => ({
  type: Actions.GET_USER_PROFILE_SUCCESS,
  payload,
});

export const getUserProfileError = (error: string): ReduxAction => ({
  type: Actions.GET_USER_PROFILE_ERROR,
  error,
});

export const getUserProfileRequestLoading = (): ReduxAction => ({
  type: Actions.GET_USER_PROFILE_LOADING,
});
