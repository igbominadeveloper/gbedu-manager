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

type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export interface RawSong {
  album: {
    artists: Array<Artist>;
    images: Array<SpotifyImage>;
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

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  IDLE = 'IDLE',
}

export interface RequestStatus {
  getUserProfile: Status;
}
export interface ReduxState {
  requestStatus: RequestStatus;
  error: string;
  userProfile: SpotifyUser;
}

export interface ReduxAction {
  type: string;
  payload?: any;
  error?: any;
}

export interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href?: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  type: string;
  uri: string;
}

export const DummyUser: SpotifyUser = {
  display_name: '',
  external_urls: {
    spotify: '',
  },
  followers: {
    href: '',
    total: 0,
  },
  href: '',
  id: '',
  images: [],
  type: '',
  uri: '',
};
