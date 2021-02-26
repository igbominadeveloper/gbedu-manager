import axiosInstance from './axiosInstance';

export const getUserProfile = () => axiosInstance.get('/me');
