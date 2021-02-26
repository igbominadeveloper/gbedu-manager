import axiosInstance from './axiosInstance';

export const getUserProfile = () => axiosInstance.get('/me');

export const searchSongs = (searchString: string) =>
  axiosInstance.get(`/search?query=${searchString}&type=track`);
