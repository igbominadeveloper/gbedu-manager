import { ReduxAction, SongInterface, SpotifyUser } from '../types';
import * as Actions from './constants';

// get user profile
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

// search songs

export const searchSongsRequestLoading = (): ReduxAction => ({
  type: Actions.SEARCH_FOR_SONGS_LOADING,
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

// Logout User

export const logoutUser = (): ReduxAction => ({
  type: Actions.LOGOUT_USER,
});

// new-releases
export const getNewReleasesRequestLoading = (): ReduxAction => ({
  type: Actions.GET_NEW_RELEASES_LOADING,
});

export const getNewReleasesSuccess = (
  payload: Array<SongInterface>
): ReduxAction => ({
  type: Actions.GET_NEW_RELEASES_SUCCESS,
  payload,
});

export const getNewReleasesError = (error: string): ReduxAction => ({
  type: Actions.GET_NEW_RELEASES_ERROR,
  error,
});

// retrieve user search query from firebase
export const getUserLastSearchResultRequestLoading = (): ReduxAction => ({
  type: Actions.GET_USER_SEARCH_RESULT_LOADING,
});

export const getUserLastSearchResultSuccess = (payload: {
  searchQuery: string;
  searchResult: Array<SongInterface>;
}): ReduxAction => {
  return {
    type: Actions.GET_USER_SEARCH_RESULT_SUCCESS,
    payload,
  };
};

export const getUserLastSearchResultError = (error: string): ReduxAction => ({
  type: Actions.GET_USER_SEARCH_RESULT_ERROR,
  error,
});

// store user favorited tracks/albums to firebase
export const addToLibraryRequestLoading = (): ReduxAction => ({
  type: Actions.ADD_TO_LIBRARY_LOADING,
});

export const addToLibrarySuccess = (payload: SongInterface): ReduxAction => {
  return {
    type: Actions.ADD_TO_LIBRARY_SUCCESS,
    payload,
  };
};

export const addToLibraryError = (error: string): ReduxAction => ({
  type: Actions.ADD_TO_LIBRARY_ERROR,
  error,
});
