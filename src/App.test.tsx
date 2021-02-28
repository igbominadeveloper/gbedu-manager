import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';

import reducer, { initialState } from './store/reducer';

jest.mock('./services');

describe('Homepage tests', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const store = createStore(reducer, initialState);
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

  test('renders the home page when user token is set', async () => {
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
});
