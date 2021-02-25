export interface SongInterface {
  thumbnail: string;
  title: string;
  album: string;
  duration: number;
  id: string;
}

type Artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type AlbumImage = {
  height: number;
  url: string;
  width: number;
};

export interface RawSong {
  album: {
    artists: Array<Artist>;
    images: Array<AlbumImage>;
    name: string;
  };
  artists: Array<Artist>;
  duration_ms: number;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export enum SongLayout {
  LANDSCAPE = 'LANDSCAPE',
  PORTRAIT = 'PORTRAIT',
}
