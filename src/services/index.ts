import axiosInstance from './axiosInstance';

export const getUserProfile = () => axiosInstance.get('/me');

export const searchSongs = (searchString: string) =>
  axiosInstance.get(`/search?query=${searchString}&type=track`);

export const getNewReleases = () =>
  axiosInstance.get(`/browse/new-releases?limit=5`);
