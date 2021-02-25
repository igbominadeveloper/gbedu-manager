import { RawSong, SongInterface } from '../types';

export const transformedSongs = (songs: Array<RawSong>): Array<SongInterface> =>
  songs.map((song: RawSong) => ({
    album: song.album.name,
    duration: song.duration_ms,
    thumbnail: song.album.images[1].url,
    title: song.name,
    id: song.id,
  }));

export const truncate = (word: string, maxLength: number = 15): string => {
  if (word.length >= maxLength) {
    return `${word.substring(0, maxLength)} ...`;
  }

  return word;
};

export const minuteAndSeconds = (duration: number): string => {
  const durationInMinutes = Number(duration / (60 * 1000)).toFixed(2);
  const durationString = String(durationInMinutes).split('.');

  const minutes = durationString[0];

  const seconds = Number(Number(`0.${durationString[1]}`) * 60).toFixed(0);

  return `${minutes}:${Number(seconds) < 10 ? 0 + '' + seconds : seconds}`;
};
