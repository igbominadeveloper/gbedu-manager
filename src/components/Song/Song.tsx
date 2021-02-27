import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  manageLibraryRequestLoading,
  manageLibrarySuccess,
  manageLibraryError,
  removeTrackFromLibrary,
  getAlbumTracksRequestLoading,
  getAlbumTracksSuccess,
  getAlbumTracksError,
} from '../../store/actions';

import * as Services from '../../services';

import { ReduxState, SongInterface, SongLayout } from '../../types';

import { minuteAndSeconds, truncate } from '../../utils';

import './Song.scss';

interface SongProps {
  song: SongInterface;
  layout: SongLayout;
}

const Song: React.FunctionComponent<SongProps> = ({
  song,
  layout,
}: SongProps) => {
  const dispatch = useDispatch();
  const library = useSelector((state: ReduxState) => state.userLibrary);

  const songHasBeenAddedToLibrary = useSelector((state: ReduxState) => {
    const songExists = state.userLibrary.find(
      (track: SongInterface) => track.id === song.id
    );

    return songExists ? true : false;
  });

  const manageLibrary = useCallback(
    async (song: SongInterface) => {
      try {
        dispatch(manageLibraryRequestLoading());

        let allFavourites = [];

        if (songHasBeenAddedToLibrary) {
          allFavourites = library.filter(
            (track: SongInterface) => track.id !== song.id
          );

          dispatch(removeTrackFromLibrary(song));
        } else {
          allFavourites = [song].concat(...library);
          dispatch(manageLibrarySuccess(song));
        }

        await Services.manageUserLibrary(allFavourites);
      } catch (error) {
        dispatch(manageLibraryError(error.message));
      }
    },
    [dispatch, library, songHasBeenAddedToLibrary]
  );

  const getAlbumTracks = useCallback(
    async (album: SongInterface) => {
      try {
        dispatch(
          getAlbumTracksRequestLoading({
            id: album.id,
            thumbnail: album.thumbnail,
            name: album.title,
            uri: album.uri,
          })
        );
        const response = await Services.getAlbumTracks(album.id);

        dispatch(getAlbumTracksSuccess(response.data.items));
      } catch (error) {
        dispatch(getAlbumTracksError(error.message));
      }
    },
    [dispatch]
  );

  return layout === SongLayout.PORTRAIT ? (
    <div className="song-portrait">
      <div className="song-portrait__thumbnail">
        <img src={song.thumbnail} alt={`${song.title}`} />
      </div>
      <div className="song-portrait__title">{truncate(song.title)}</div>

      {song.type === 'album' ? (
        <div
          className="song-portrait__action pointer"
          onClick={() => getAlbumTracks(song)}
        >
          View Tracks
        </div>
      ) : (
        <div
          className="song-portrait__action pointer"
          onClick={() => manageLibrary(song)}
        >
          {songHasBeenAddedToLibrary ? 'Remove -' : 'Add +'}
        </div>
      )}
    </div>
  ) : (
    <div className="song-landscape">
      <div className="song-landscape__art-and-title">
        <div className="song-landscape__thumbnail">
          <img src={song.thumbnail} alt={`${song.title}`} />
        </div>
        <div className="song-landscape__title">{song.title}</div>
      </div>
      <div className="song-landscape__album">{song.album}</div>
      <div className="song-landscape__duration">
        {minuteAndSeconds(song.duration)}
      </div>
      <div
        className="song-landscape__action pointer"
        onClick={() => manageLibrary(song)}
      >
        {songHasBeenAddedToLibrary ? 'Remove -' : 'Add +'}
      </div>
    </div>
  );
};

export default Song;
