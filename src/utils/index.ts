import Qs from 'qs';

import { RawSong, SongInterface, SpotifyUser } from '../types';

export const transformSearchResult = (
  songs: Array<RawSong>
): Array<SongInterface> =>
  songs.map((song: RawSong) => ({
    album: song.album.name,
    duration: song.duration_ms,
    thumbnail: song.album.images[1].url,
    title: song.name,
    id: song.id,
    uri: song.uri,
    type: song.type,
  }));

export const truncate = (word: string, maxLength: number = 13): string => {
  if (word.length >= maxLength) {
    return `${word.substring(0, maxLength)} ...`;
  }

  return word;
};

export const minuteAndSeconds = (
  duration: number,
  format: string = 'number'
): string => {
  const durationInMinutes = Number(duration / (60 * 1000)).toFixed(2);
  const durationString = String(durationInMinutes).split('.');

  const minutes = durationString[0];

  const seconds = Number(Number(`0.${durationString[1]}`) * 60).toFixed(0);

  if (format === 'number') {
    return `${minutes}:${Number(seconds) < 10 ? 0 + '' + seconds : seconds}`;
  }

  return `${minutes} min ${
    Number(seconds) < 10 ? 0 + '' + seconds : seconds
  } sec`;
};

export const getTokenFromResponse = (
  uri: string
): { access_token: string; expires_in: string } => {
  const urlTransformed: any = Qs.parse(uri.split('#')[1]);

  return {
    access_token: urlTransformed.access_token,
    expires_in: urlTransformed.expires_in,
  };
};

export const convertUserStringToJson = (
  userObjectString: string
): SpotifyUser => JSON.parse(userObjectString);

export const activeUserProfile = (): SpotifyUser => {
  const userProfileString = localStorage.getItem('auth-user');

  return convertUserStringToJson(userProfileString || '');
};

export const errorHandler = (error: string): string => {
  // TODO This is a temporary error handler, this cannot scale
  const networkError = ['Failed to fetch', 'Network Error'];
  if (networkError.includes(error))
    return 'The server cannot be reached, please try again later';

  return error;
};
