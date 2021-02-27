import { ReduxState, Status, ReduxAction, DummyUser } from '../types';

import * as Actions from './constants';

export const initialState: ReduxState = {
  error: '',
  requestStatus: {
    getUserProfile: Status.IDLE,
    searchSongs: Status.IDLE,
    getNewReleases: Status.IDLE,
    getUserLastSearchResult: Status.IDLE,
    addToLibrary: Status.IDLE,
  },
  userProfile: { ...DummyUser },
  searchResult: [],
  newReleases: [],
  searchQuery: '',
  userLibray: [],
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
        error: action.error,
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
        error: action.error,
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
        error: action.error,
      };
    }

    case Actions.GET_USER_SEARCH_RESULT_LOADING: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserLastSearchResult: Status.LOADING,
        },
      };
    }

    case Actions.GET_USER_SEARCH_RESULT_SUCCESS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserLastSearchResult: Status.SUCCESS,
        },
        searchQuery: action.payload.searchQuery,
        searchResult: action.payload.searchResult,
      };
    }

    case Actions.GET_USER_SEARCH_RESULT_ERROR: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          getUserLastSearchResult: Status.ERROR,
        },
        error: action.error,
      };
    }

    case Actions.ADD_TO_LIBRARY_LOADING: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          addToLibrary: Status.LOADING,
        },
      };
    }

    case Actions.ADD_TO_LIBRARY_SUCCESS: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          addToLibrary: Status.SUCCESS,
        },
        userLibray: [action.payload].concat(state.userLibray),
      };
    }

    case Actions.ADD_TO_LIBRARY_ERROR: {
      return {
        ...state,
        requestStatus: {
          ...state.requestStatus,
          addToLibrary: Status.ERROR,
        },
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
