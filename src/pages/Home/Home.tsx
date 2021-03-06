import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Album,
  AlbumTrack,
  ReduxState,
  SongInterface,
  SongLayout,
  Status,
} from '../../types';

import Song from '../../components/Song/Song';
import Loader from '../../components/Loader/Loader';

import {
  getNewReleasesError,
  getNewReleasesRequestLoading,
  getNewReleasesSuccess,
  getUserLastSearchResultError,
  getUserLastSearchResultRequestLoading,
  getUserLastSearchResultSuccess,
  getUserLibraryError,
  getUserLibraryRequestLoading,
  getUserLibrarySuccess,
} from '../../store/actions';

import * as Services from '../../services';

import { errorHandler } from '../../utils';

import './Home.scss';

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();

  const searchResult = useSelector((state: ReduxState) => state.searchResult);
  const newReleases = useSelector((state: ReduxState) => state.newReleases);
  const searchCameBackEmpty = useSelector((state: ReduxState) => {
    const {
      requestStatus: { searchSongs },
      searchResult,
    } = state;

    return (
      (searchSongs === Status.LOADING ||
        searchSongs === Status.SUCCESS ||
        searchSongs !== Status.IDLE) &&
      searchResult.length === 0
    );
  });
  const albumTracks = useSelector((state: ReduxState) => state.albumTracks);
  const activeAlbum = useSelector((state: ReduxState) => state.activeAlbum);
  const newReleasesAreBeingLoaded = useSelector(
    (state: ReduxState) => state.requestStatus.getNewReleases === Status.LOADING
  );

  const getNewReleases = useCallback(async () => {
    try {
      dispatch(getNewReleasesRequestLoading());
      const response = await Services.getNewReleases();

      dispatch(getNewReleasesSuccess(response.data.albums.items));
    } catch (error) {
      toast.error(errorHandler(error.message));
      dispatch(getNewReleasesError(error.message));
    }
  }, [dispatch]);

  const getUserLibrary = useCallback(async () => {
    try {
      dispatch(getUserLibraryRequestLoading());
      const response = await Services.getUserLibrary();

      dispatch(getUserLibrarySuccess(response));
    } catch (error) {
      toast.error(errorHandler(error.message));
      dispatch(getUserLibraryError(error.message));
    }
  }, [dispatch]);

  const getUserLastSearchResult = useCallback(async () => {
    try {
      dispatch(getUserLastSearchResultRequestLoading());
      const response = await Services.getUserLastSearchResult();

      dispatch(
        getUserLastSearchResultSuccess({
          searchQuery: response.searchQuery,
          searchResult: response.searchResult,
        })
      );
    } catch (error) {
      toast.error(errorHandler(error.message));
      dispatch(getUserLastSearchResultError(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserLibrary();
    getNewReleases();
    getUserLastSearchResult();
  }, [getNewReleases, dispatch, getUserLastSearchResult, getUserLibrary]);

  return (
    <div className="home page">
      <section className="new-release">
        <div className="page-title" data-testid="new-release-heading">
          New Releases
        </div>

        {newReleasesAreBeingLoaded ? (
          <Loader width={8} />
        ) : (
          <div
            className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}
            data-testid="new-releases"
          >
            {newReleases.map((album: Album) => (
              <Song
                key={album.id}
                song={{
                  album: album.name,
                  duration: 9,
                  id: album.id,
                  thumbnail: album.images[1].url,
                  title: album.name,
                  uri: album.uri,
                  type: album.type,
                }}
                layout={SongLayout.PORTRAIT}
              />
            ))}
          </div>
        )}

        {albumTracks.length > 0 && (
          <article className="album-tracks">
            <div className="album-tracks__album">
              <img
                src={activeAlbum.thumbnail}
                alt="Album alt"
                className="album-tracks__album--art"
                loading="lazy"
              />
              <header className="album-tracks__album--name">
                {activeAlbum.name}
              </header>
            </div>

            <section className="tracks">
              <header className="page-sub-title tracks__header">
                Tracks ({albumTracks.length})
              </header>
              {albumTracks.map((track: AlbumTrack) => (
                <Song
                  key={track.id}
                  song={{
                    album: activeAlbum.name,
                    duration: track.duration_ms,
                    id: track.id,
                    thumbnail: activeAlbum.thumbnail,
                    title: track.name,
                    type: track.type,
                    uri: track.uri,
                  }}
                  layout={SongLayout.LANDSCAPE}
                />
              ))}
            </section>
          </article>
        )}
      </section>

      <section
        className="search-results"
        data-testid="search-results-container"
      >
        <div className="page-title" data-testid="search-results-heading">
          Search Results
        </div>

        <div className={`songs-${SongLayout.LANDSCAPE.toLowerCase()}`}>
          <div className="search-results__headings">
            <div className="search-results__headings--title">Title</div>
            <div className="search-results__headings--album">Album</div>
            <div className="search-results__headings--duration">Duration</div>
          </div>

          {searchCameBackEmpty ? (
            <p>No Match Found</p>
          ) : (
            searchResult.map((song: SongInterface) => (
              <Song key={song.id} song={song} layout={SongLayout.LANDSCAPE} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
