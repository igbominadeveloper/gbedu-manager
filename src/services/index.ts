import axiosInstance from './generalAxiosInstance';
import { activeUserProfile } from '../utils';
import { SongInterface } from '../types';

const applicationName = process.env.REACT_APP_APP_NAME;

const firebaseUrl = process.env.REACT_APP_FIREBASE_URL;

export const getUserProfile = () => axiosInstance.get('/me');

export const searchSongs = (searchString: string) =>
  axiosInstance.get(`/search?query=${searchString}&type=track`);

export const getNewReleases = () =>
  axiosInstance.get(`/browse/new-releases?limit=5`);

export const createNewPlaylist = () => {
  const userProfile = activeUserProfile();

  return axiosInstance.post(`/users/${userProfile.id}/playlists`, {
    name: `${applicationName} playlist @ ${new Date().toLocaleTimeString()}`,
    public: false,
  });
};

export const addItemsToPlaylist = (playlistId: string, uris: Array<string>) =>
  axiosInstance.post(`playlists/${playlistId}/tracks`, {
    uris,
  });

export const getAlbumTracks = (albumId: string) =>
  axiosInstance.get(`albums/${albumId}/tracks`);

export const storeUserLastSearchQuery = (
  searchQuery: string,
  searchResult: Array<SongInterface>
) => {
  const userProfile = activeUserProfile();

  return fetch(`${firebaseUrl}/${userProfile.id}/search.json`, {
    method: 'put',
    body: JSON.stringify({ searchResult, searchQuery }),
  });
};

export const getUserLastSearchResult = async () => {
  const userProfile = activeUserProfile();

  const response = await fetch(`${firebaseUrl}/${userProfile.id}/search.json`, {
    method: 'get',
  });
  return await response.json();
};

export const manageUserLibrary = (songs: Array<SongInterface>) => {
  const userProfile = activeUserProfile();

  return fetch(`${firebaseUrl}/${userProfile.id}/favourites.json`, {
    method: 'put',
    body: JSON.stringify(songs),
  });
};

export const getUserLibrary = async () => {
  const userProfile = activeUserProfile();

  const response = await fetch(
    `${firebaseUrl}/${userProfile.id}/favourites.json`,
    {
      method: 'get',
    }
  );
  return await response.json();
};
