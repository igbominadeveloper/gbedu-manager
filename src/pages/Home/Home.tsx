import { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Album,
  ReduxState,
  SongInterface,
  SongLayout,
  Status,
} from '../../types';

import Song from '../../components/Song/Song';

import {
  getNewReleasesError,
  getNewReleasesRequestLoading,
  getNewReleasesSuccess,
  getUserLibraryError,
  getUserLibraryRequestLoading,
  getUserLibrarySuccess,
} from '../../store/actions';

import * as Services from '../../services';

import './Home.scss';

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state: ReduxState) => state.searchResult);
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

  const getNewReleases = useCallback(async () => {
    try {
      dispatch(getNewReleasesRequestLoading());
      const response = await Services.getNewReleases();

      dispatch(getNewReleasesSuccess(response.data.albums.items));
    } catch (error) {
      console.log(error.message);

      dispatch(getNewReleasesError(error));
    }
  }, [dispatch]);

  const getUserLibrary = useCallback(async () => {
    try {
      dispatch(getUserLibraryRequestLoading());
      const response = await Services.getUserLibrary();

      dispatch(getUserLibrarySuccess(response));
    } catch (error) {
      console.log(error.message);

      dispatch(getUserLibraryError(error));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserLibrary();
    getNewReleases();
  }, [getNewReleases, getUserLibrary]);

  return (
    <div className="home page">
      <section className="new-release">
        <div className="page-title">New Releases</div>

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
              }}
              layout={SongLayout.PORTRAIT}
            />
          ))}
        </div>
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
            tracks.map((song: SongInterface) => (
              <Song key={song.id} song={song} layout={SongLayout.LANDSCAPE} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
