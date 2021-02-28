import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Home from '../Home';

import reducer, { initialState } from '../../../store/reducer';
import * as Actions from '../../../store/actions';

import NewReleases from '../../../tests/NewReleases.json';
import SearchResults from '../../../tests/SearchResults.json';
import { transformSearchResult } from '../../../utils';

jest.mock('../../../services');

describe('Authenticated User tests', () => {
  beforeAll(() => {
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
  });

  const store = createStore(reducer, initialState);

  const appWrapper = () =>
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

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
