import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const getUserLibrary = useCallback(async () => {
    try {
      dispatch(getUserLibraryRequestLoading());
      const response = await Services.getUserLibrary();

      dispatch(getUserLibrarySuccess(response));
    } catch (error) {
      dispatch(getUserLibraryError(error));
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
    } catch (error) {
      dispatch(exportToSpotifyPlaylistError(error));
    }
  }, [dispatch, library]);

  useEffect(() => {
    getUserLibrary();
  }, [getUserLibrary]);

  return (
    <div className="page">
      <div className="page-title my-library__heading">
        My Library
        {!libraryIsEmpty && (
          <button
            className="export-to-spotify"
            onClick={exportToSpotifyPlaylist}
            disabled={libraryIsBeingExportedToSpotify}
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
        )}
      </div>

      <div className="my-library">
        {libraryIsBeingLoaded ? (
          <Loader width={8} />
        ) : libraryIsEmpty ? (
          <div className="my-library__empty">
            <img
              className="my-library__empty--image"
              src={Empty}
              alt="Empty Library"
            />
            <p className="page-sub-title my-library__empty--text">
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
