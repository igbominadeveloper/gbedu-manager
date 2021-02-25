import { SongInterface, SongLayout } from '../../types';

import { minuteAndSeconds, truncate } from '../../utils';

import './Song.scss';

interface SongProps {
  song: SongInterface;
  layout: SongLayout;
}

const Song: React.FunctionComponent<SongProps> = ({
  song,
  layout,
}: SongProps) => {
  return layout === SongLayout.PORTRAIT ? (
    <div className="song-portrait">
      <div className="song-portrait__thumbnail">
        <img src={song.thumbnail} alt={`${song.title}`} />
      </div>
      <div className="song-portrait__title">{truncate(song.title)}</div>
      <div className="song-portrait__action pointer">Add +</div>
    </div>
  ) : (
    <div className="song-landscape">
      <div className="song-landscape__art-and-title">
        <div className="song-landscape__thumbnail">
          <img src={song.thumbnail} alt={`${song.title}`} />
        </div>
        <div className="song-landscape__title">{song.title}</div>
      </div>
      <div className="song-landscape__album">{song.album}</div>
      <div className="song-landscape__duration">
        {minuteAndSeconds(song.duration)}
      </div>
      <div className="song-landscape__action pointer">Add +</div>
    </div>
  );
};

export default Song;
