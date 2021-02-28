import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MockAdapter from 'axios-mock-adapter';

import AxiosInstance from './services/generalAxiosInstance';

import App from './App';

import reducer, { initialState } from './store/reducer';

import * as Actions from './store/actions';

import { transformSearchResult } from './utils';

import NewReleases from './tests/NewReleases.json';
import SearchResults from './tests/SearchResults.json';

jest.mock('./services');

const spotifyUrl = process.env.REACT_APP_SPOTIFY_API_URL;

describe('All tests', () => {
  const store = createStore(reducer, initialState);
  const mock = new MockAdapter(AxiosInstance);

  const appWrapper = () => {
    const history = createMemoryHistory();

    return render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  };

  test('renders the App component without crashing', () => {
    const wrapper = appWrapper();

    expect(wrapper).toBeDefined();
  });

  test('renders the login page on initial render', async () => {
    const wrapper = appWrapper();

    const loginButton = await wrapper.findByTestId('login-button');

    expect(loginButton).toBeDefined();
  });

  describe('Authenticated User tests', () => {
    beforeEach(() => {
      window.localStorage.setItem('token', '9090hjut-0-40-jhh');
      window.localStorage.setItem(
        'auth-user',
        JSON.stringify({
          country: 'NG',
          display_name: 'John Doe',
          email: 'john.doe@example.com',
          explicit_content: { filter_enabled: false, filter_locked: false },
          external_urls: {
            spotify: 'lll',
          },
          followers: { href: null, total: 0 },
          href: 'jkjjkf',
          id: 'jjkfkjfi904h',
          images: [],
          product: 'open',
          type: 'user',
          uri: 'spotify:user:jjkfkjfi904h',
        })
      );

      mock
        .onGet(`${spotifyUrl}/browse/new-releases?limit=5`)
        .reply(200, { response: { data: NewReleases } });
    });

    test('renders the home page when user token is set', async () => {
      const wrapper = appWrapper();

      const newReleasesHeading = await wrapper.findByTestId(
        'new-release-heading'
      );
      const searchResultsHeading = await wrapper.findByTestId(
        'search-results-heading'
      );

      expect(newReleasesHeading).toHaveTextContent('New Releases');
      expect(searchResultsHeading).toHaveTextContent('Search Results');
    });

    test('renders the homepage with new released albums when album items are in the store', async () => {
      store.dispatch(Actions.getNewReleasesSuccess(NewReleases.albums.items));

      const wrapper = appWrapper();

      const allNewlyReleasedAlbums = await wrapper.findAllByTestId(
        'song-portrait'
      );

      expect(allNewlyReleasedAlbums.length).toEqual(10);
    });

    test(`renders all the search items from the user's previous searches`, async () => {
      store.dispatch(
        Actions.getUserLastSearchResultSuccess({
          searchQuery: 'ojuelegba',
          searchResult: transformSearchResult(SearchResults.tracks.items),
        })
      );

      const wrapper = appWrapper();

      const searchResults = await wrapper.findAllByTestId('song-landscape');

      expect(searchResults.length).toEqual(10);
    });
  });
});
