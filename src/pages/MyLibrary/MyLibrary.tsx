import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ReduxState, SongInterface, SongLayout } from '../../types';

import Song from '../../components/Song/Song';

const MyLibrary: FunctionComponent = () => {
  const library = useSelector((state: ReduxState) => state.userLibray);

  return (
    <div className="page">
      <div className="page-title">My Library</div>

      <div className={`songs-${SongLayout.PORTRAIT.toLowerCase()}`}>
        {library.map((song: SongInterface) => (
          <Song key={song.id} song={song} layout={SongLayout.PORTRAIT} />
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
