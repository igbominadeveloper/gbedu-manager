import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import Song from '../../components/Song/Song';

import { ReduxState, SongInterface, SongLayout } from '../../types';

import Empty from '../../assets/empty.svg';

import './MyLibrary.scss';

const MyLibrary: FunctionComponent = () => {
  const library = useSelector((state: ReduxState) => state.userLibray);
  const libraryIsEmpty = useSelector(
    (state: ReduxState) => state.userLibray.length === 0
  );

  return (
    <div className="page">
      <div className="page-title">My Library</div>

      <div className="my-library">
        {libraryIsEmpty && (
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
        )}
        {library.map((song: SongInterface) => (
          <Song key={song.id} song={song} layout={SongLayout.PORTRAIT} />
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
