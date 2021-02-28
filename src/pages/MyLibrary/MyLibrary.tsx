import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Song from '../../components/Song/Song';
import Loader from '../../components/Loader/Loader';

import { ReduxState, SongInterface, SongLayout, Status } from '../../types';

import Empty from '../../assets/empty.svg';
import SpotifyIcon from '../../assets/spotify.svg';

import {
  getUserLibraryError,
  getUserLibraryRequestLoading,
  getUserLibrarySuccess,
  exportToSpotifyPlaylistRequestLoading,
  exportToSpotifyPlaylistSuccess,
  exportToSpotifyPlaylistError,
} from '../../store/actions';

import * as Services from '../../services';

import { errorHandler, minuteAndSeconds } from '../../utils';

import './MyLibrary.scss';

const MyLibrary: FunctionComponent = () => {
  const dispatch = useDispatch();
  const library = useSelector((state: ReduxState) => state.userLibrary);
  const libraryIsEmpty = useSelector(
    (state: ReduxState) => state.userLibrary.length === 0
  );
  const libraryIsBeingLoaded = useSelector(
    (state: ReduxState) => state.requestStatus.getUserLibrary === Status.LOADING
  );
  const libraryIsBeingExportedToSpotify = useSelector(
    (state: ReduxState) =>
      state.requestStatus.exportToSpotifyPlaylist === Status.LOADING
  );
  const librarySize = useSelector(
    (state: ReduxState) => state.userLibrary.length
  );
  const totalPlaytime = useSelector((state: ReduxState) =>
    state.userLibrary.reduce(
      (totalMilliseconds: number, currentTrack: SongInterface) =>
        currentTrack.duration + totalMilliseconds,
      0
    )
  );

  const getUserLibrary = useCallback(async () => {
    try {
      dispatch(getUserLibraryRequestLoading());
      const response = await Services.getUserLibrary();

      dispatch(getUserLibrarySuccess(response));
    } catch (error) {
      dispatch(getUserLibraryError(error.message));
      toast.error(errorHandler(error.message));
    }
  }, [dispatch]);

  const exportToSpotifyPlaylist = useCallback(async () => {
    try {
      dispatch(exportToSpotifyPlaylistRequestLoading());
      const newPlaylistResponse = await Services.createNewPlaylist();
      const urisToAddToSpotify = library.map((item: SongInterface) => item.uri);

      await Services.addItemsToPlaylist(
        newPlaylistResponse.data.id,
        urisToAddToSpotify
      );

      dispatch(exportToSpotifyPlaylistSuccess());
      toast.success('Library was exported successfully');
    } catch (error) {
      dispatch(exportToSpotifyPlaylistError(error.message));
      toast.error(errorHandler(error.message));
    }
  }, [dispatch, library]);

  useEffect(() => {
    getUserLibrary();
  }, [getUserLibrary]);

  return (
    <div className="page">
      <div
        className="page-title my-library__heading"
        data-testid="my-library-heading"
      >
        My Library
        {!libraryIsEmpty && (
          <>
            <button
              className="export-to-spotify"
              onClick={exportToSpotifyPlaylist}
              disabled={libraryIsBeingExportedToSpotify}
              data-testid="export-to-spotify"
            >
              <img
                src={SpotifyIcon}
                alt="spotify-icon"
                className="export-to-spotify__image"
              />
              Export To Spotify
              <span className="export-to-spotify__loader">
                {libraryIsBeingExportedToSpotify && <Loader width={3} />}
              </span>
            </button>
            <p className="app-info" data-testid="my-library-size-info">
              {librarySize > 1 ? `${librarySize} songs` : `${librarySize} song`}
              , {minuteAndSeconds(totalPlaytime, 'string')}
            </p>
          </>
        )}
      </div>

      <div className="my-library" data-testid="my-library">
        {libraryIsBeingLoaded ? (
          <Loader width={8} />
        ) : libraryIsEmpty ? (
          <div className="my-library__empty" data-testid="empty-library">
            <img
              className="my-library__empty--image"
              src={Empty}
              alt="Empty Library"
            />
            <p
              className="page-sub-title my-library__empty--text"
              data-testid="empty-library-text"
            >
              Your Library is empty
            </p>
          </div>
        ) : (
          library.map((song: SongInterface) => (
            <Song key={song.id} song={song} layout={SongLayout.PORTRAIT} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
