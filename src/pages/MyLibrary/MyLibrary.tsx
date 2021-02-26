import { FunctionComponent } from 'react';

import { SongInterface, SongLayout } from '../../types';
import Mocks from '../../tests/mocks.json';

import Song from '../../components/Song/Song';

import { transformSearchResult } from '../../utils';

const MyLibrary: FunctionComponent = () => {
  return (
    <div className="page">
      <div className="page-title">My Library</div>

      <div className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}>
        {transformSearchResult(Mocks.tracks.items).map(
          (song: SongInterface) => (
            <Song key={song.id} song={song} layout={SongLayout.PORTRAIT} />
          )
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
