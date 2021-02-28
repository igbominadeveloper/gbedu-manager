import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useLocation } from 'react-router-dom';

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

import './Home.scss';

const Home: FunctionComponent = () => {
  // const [showAlbumTracks, setShowAlbumTracks] = useState(false);
  const dispatch = useDispatch();
  // const routeMatch = useLocation();
  // const history = useHistory();

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
      dispatch(getNewReleasesError(error));
    }
  }, [dispatch]);

  useEffect(() => {
    const getUserLibrary = async () => {
      try {
        dispatch(getUserLibraryRequestLoading());
        const response = await Services.getUserLibrary();

        dispatch(getUserLibrarySuccess(response));
      } catch (error) {
        dispatch(getUserLibraryError(error));
      }
    };

    const getUserLastSearchResult = async () => {
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
        dispatch(getUserLastSearchResultError(error.message));
      }
    };

    getUserLibrary();
    getNewReleases();
    getUserLastSearchResult();

    return () => {};
  }, [getNewReleases, dispatch]);

  return (
    <div className="home page">
      <section className="new-release">
        <div className="page-title">New Releases</div>

        {newReleasesAreBeingLoaded ? (
          <Loader width={8} />
        ) : (
          <div className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}>
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

      <section className="search-results">
        <div className="page-title">Search Results</div>

        <div className={`songs-${SongLayout.LANDSCAPE.toLowerCase()}`}>
          <div className="search-results__headings">
            <div className="search-results__headings--title">Title</div>
            <div className="search-results__headings--album">Album</div>
            <div className="search-results__headings--duration">Duration</div>
          </div>
          {/* {searchIsBeingProcessed && <p>Loading...</p>} */}
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
