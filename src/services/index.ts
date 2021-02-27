import axiosInstance from './generalAxiosInstance';
import { convertUserStringToJson } from '../utils';
import { SongInterface } from '../types';

// const spotifyUrl = process.env.REACT_APP_SPOTIFY_API_URL;

const firebaseUrl = process.env.REACT_APP_FIREBASE_URL;

export const getUserProfile = () => axiosInstance.get('/me');

export const searchSongs = (searchString: string) =>
  axiosInstance.get(`/search?query=${searchString}&type=track`);

export const getNewReleases = () =>
  axiosInstance.get(`/browse/new-releases?limit=5`);

export const storeUserLastSearchQuery = (
  searchQuery: string,
  searchResult: Array<SongInterface>
) => {
  const userProfileString = localStorage.getItem('auth-user');

  const userProfile = convertUserStringToJson(userProfileString || '');

  return fetch(`${firebaseUrl}/${userProfile.id}/search.json`, {
    method: 'put',
    body: JSON.stringify({ searchResult, searchQuery }),
  });
};

export const getUserLastSearchResult = () => {
  const userProfileString = localStorage.getItem('auth-user');

  const userProfile = convertUserStringToJson(userProfileString || '');

  return fetch(`${firebaseUrl}/${userProfile.id}/search.json`, {
    method: 'get',
  }).then((response) => response.json());
};

export const addSongToUserLibrary = (songs: Array<SongInterface>) => {
  const userProfileString = localStorage.getItem('auth-user');

  const userProfile = convertUserStringToJson(userProfileString || '');

  return fetch(`${firebaseUrl}/${userProfile.id}/favourites.json`, {
    method: 'put',
    body: JSON.stringify(songs),
  });
};
