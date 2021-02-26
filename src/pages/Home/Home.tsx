import { FunctionComponent } from 'react';

import { SongInterface, SongLayout } from '../../types';
import Mocks from '../../tests/mocks.json';

import Song from '../../components/Song/Song';

import { transformedSongs } from '../../utils';

import './Home.scss';

const Home: FunctionComponent = () => {
  return (
    <div className="home page">
      <section className="new-release">
        <div className="page-title">New Releases</div>

        <div className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}>
          {transformedSongs(Mocks.tracks.items)
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
          {transformedSongs(Mocks.tracks.items).map((song: SongInterface) => (
            <Song key={song.id} song={song} layout={SongLayout.LANDSCAPE} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
