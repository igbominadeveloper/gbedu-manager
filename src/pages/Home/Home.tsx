import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ReduxState, SongInterface, SongLayout, Status } from '../../types';
import Mocks from '../../tests/mocks.json';

import Song from '../../components/Song/Song';

import { hydrateStringifiedUserObject, transformSongs } from '../../utils';
import { getUserProfileSuccess } from '../../store/actions';

import './Home.scss';

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tracks = useSelector((state: ReduxState) => state.searchResult);
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

  const searchIsBeingProcessed = useSelector(
    (state: ReduxState) => state.requestStatus.searchSongs === Status.LOADING
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    let authenticatedUser = localStorage.getItem('auth-user');

    if (!token) {
      history.push('/login');
      return;
    }

    if (authenticatedUser) {
      const hydratedUserObject = hydrateStringifiedUserObject(
        authenticatedUser || ''
      );

      dispatch(getUserProfileSuccess(hydratedUserObject));
      return;
    }
  }, [dispatch, history]);

  return (
    <div className="home page">
      <section className="new-release">
        <div className="page-title">New Releases</div>

        <div className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}>
          {transformSongs(Mocks.tracks.items)
            .splice(0, 5)
            .map((song: SongInterface) => (
              <Song key={song.id} song={song} layout={SongLayout.PORTRAIT} />
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
          {searchIsBeingProcessed && <p>Loading...</p>}
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
