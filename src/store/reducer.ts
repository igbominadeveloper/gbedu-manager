import { ReduxState, Status, ReduxAction, DummyUser } from '../types';

import * as Actions from './constants';

export const initialState: ReduxState = {
  error: '',
  requestStatus: {
    getUserProfile: Status.IDLE,
    searchSongs: Status.IDLE,
    getNewReleases: Status.IDLE,
  },
  userProfile: { ...DummyUser },
  searchResult: [],
  newReleases: [],
};

const reducer = (
  state: ReduxState = initialState,
  action: ReduxAction
): ReduxState => {
  switch (action.type) {
    case Actions.GET_USER_PROFILE_LOADING: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserProfile: Status.LOADING,
        },
        userProfile: { ...DummyUser },
      };
    }

    case Actions.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserProfile: Status.SUCCESS,
        },
        userProfile: action.payload,
      };
    }

    case Actions.GET_USER_PROFILE_ERROR: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserProfile: Status.ERROR,
        },
        userProfile: { ...DummyUser },
      };
    }

    case Actions.SEARCH_FOR_SONGS_LOADING: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          searchSongs: Status.LOADING,
        },
      };
    }

    case Actions.SEARCH_FOR_SONGS_SUCCESS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          searchSongs: Status.SUCCESS,
        },
        searchResult: action.payload,
      };
    }

    case Actions.SEARCH_FOR_SONGS_ERROR: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          searchSongs: Status.ERROR,
        },
      };
    }

    case Actions.LOGOUT_USER: {
      return {
        ...initialState,
      };
    }

    case Actions.GET_NEW_RELEASES_LOADING: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getNewReleases: Status.LOADING,
        },
      };
    }

    case Actions.GET_NEW_RELEASES_SUCCESS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getNewReleases: Status.SUCCESS,
        },
        newReleases: action.payload,
      };
    }

    case Actions.GET_NEW_RELEASES_ERROR: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getNewReleases: Status.ERROR,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
