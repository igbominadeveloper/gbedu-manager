import { ReduxAction, SongInterface, SpotifyUser } from '../types';
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

export const searchSongsSuccess = (
  payload: Array<SongInterface>
): ReduxAction => ({
  type: Actions.SEARCH_FOR_SONGS_SUCCESS,
  payload,
});

export const searchSongsError = (error: string): ReduxAction => ({
  type: Actions.SEARCH_FOR_SONGS_ERROR,
  error,
});

export const searchSongsRequestLoading = (): ReduxAction => ({
  type: Actions.SEARCH_FOR_SONGS_LOADING,
});

export const logoutUser = (): ReduxAction => ({
  type: Actions.LOGOUT_USER,
});
