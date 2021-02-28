import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import NavBar from '../NavBar';

import reducer, { initialState } from '../../../store/reducer';

const store = createStore(reducer, initialState);
const history = createMemoryHistory();

describe('NavBar Page', () => {
  const user = {
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
  };

  beforeAll(() => {
    window.localStorage.setItem('token', '9090hjut-0-40-jhh');
    window.localStorage.setItem('auth-user', JSON.stringify({ ...user }));
  });

  const appWrapper = () =>
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    );

  test('It renders without crashing', () => {
    const wrapper = appWrapper();

    expect(wrapper).toBeDefined();
  });

  test('It renders all the necessary links', async () => {
    const wrapper = appWrapper();

    const username = await wrapper.findByTestId('user-name');
    const userAvatar = await wrapper.findByTestId('user-avatar');
    const goToMyLibraryLink = await wrapper.findByTestId('my-library-link');
    const logoutButton = await wrapper.findByTestId('logout-button');
    const searchInput = await wrapper.findByTestId('search-input');

    expect(username).toBeDefined();
    expect(userAvatar).toBeDefined();
    expect(goToMyLibraryLink).toBeDefined();
    expect(logoutButton).toBeDefined();
    expect(searchInput).toBeDefined();
  });

  test('It renders the correct username', async () => {
    const wrapper = appWrapper();

    const username = await wrapper.findByTestId('user-name');

    expect(username.textContent).toEqual(user.display_name);
  });
});
