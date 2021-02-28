import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MyLibrary from '../MyLibrary';

import reducer, { initialState } from '../../../store/reducer';
import { getUserLibrarySuccess } from '../../../store/actions';

import Favourites from '../../../tests/Favourites.json';

const store = createStore(reducer, initialState);

describe('My Library Page', () => {
  const appWrapper = () =>
    render(
      <Provider store={store}>
        <MyLibrary />
      </Provider>
    );

  test('It renders without crashing', async () => {
    const wrapper = appWrapper();

    const heading = await wrapper.findByTestId('my-library-heading');

    expect(wrapper).toBeDefined();
    expect(heading).toBeDefined();
  });

  test('It renders the page without any content', async () => {
    const wrapper = appWrapper();

    const emptyLibrary = await wrapper.findByTestId('empty-library');
    const emptyLibraryText = await wrapper.findByTestId('empty-library-text');

    expect(emptyLibrary).toBeDefined();
    expect(emptyLibraryText).toBeDefined();
  });

  test('It renders all the contents the user has added to the library', async () => {
    const wrapper = appWrapper();

    store.dispatch(getUserLibrarySuccess(Favourites));

    const songs = await wrapper.findAllByTestId('song-portrait');

    expect(songs.length).toEqual(5);
  });

  test('It renders the button to export to spotify', async () => {
    const wrapper = appWrapper();

    store.dispatch(getUserLibrarySuccess(Favourites));

    const exportButton = await wrapper.findByTestId('export-to-spotify');

    expect(exportButton).toBeDefined();
  });

  test('It renders the total minutes count of items in the library', async () => {
    const wrapper = appWrapper();

    store.dispatch(getUserLibrarySuccess(Favourites));

    const librarySizeInfo = await wrapper.findByTestId('my-library-size-info');

    expect(librarySizeInfo).toBeDefined();
  });

  test('It renders the button to remove an item from the library', async () => {
    const wrapper = appWrapper();

    store.dispatch(getUserLibrarySuccess(Favourites));

    const manageLibraryButtons = await wrapper.findAllByTestId(
      'manage-library-button'
    );

    expect(manageLibraryButtons.length).toEqual(5);
  });

  test('It removes an item from the library when the user clicks on the remove button', async () => {
    const wrapper = appWrapper();

    store.dispatch(getUserLibrarySuccess(Favourites));

    const { userLibrary } = store.getState();
    const currentCount = userLibrary.length;

    const songActionButtons = await wrapper.findAllByTestId(
      'manage-library-button'
    );

    fireEvent.click(songActionButtons[0]);

    expect(store.getState().userLibrary.length).toEqual(currentCount - 1);
  });
});
