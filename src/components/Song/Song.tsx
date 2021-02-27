import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToLibraryRequestLoading,
  addToLibrarySuccess,
  addToLibraryError,
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
  const library = useSelector((state: ReduxState) => state.userLibray);

  const addToLibrary = useCallback(
    async (song: SongInterface) => {
      try {
        dispatch(addToLibraryRequestLoading());
        dispatch(addToLibrarySuccess(song));

        const allFavourites = [song].concat(...library);

        await Services.addSongToUserLibrary(allFavourites);
      } catch (error) {
        dispatch(addToLibraryError(error.message));
      }

      // get the song, push to the library
      // push the library to firebase
    },
    [dispatch, library]
  );

  return layout === SongLayout.PORTRAIT ? (
    <div className="song-portrait">
      <div className="song-portrait__thumbnail">
        <img src={song.thumbnail} alt={`${song.title}`} />
      </div>
      <div className="song-portrait__title">{truncate(song.title)}</div>
      <div
        className="song-portrait__action pointer"
        onClick={() => addToLibrary(song)}
      >
        Add +
      </div>
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
        onClick={() => addToLibrary(song)}
      >
        Add +
      </div>
    </div>
  );
};

export default Song;
