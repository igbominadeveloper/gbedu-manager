import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Song from '../Song';

import { SongInterface, SongLayout } from '../../../types';

import Favourites from '../../../tests/Favourites.json';
import reducer, { initialState } from '../../../store/reducer';

describe('Song Component', () => {
  const store = createStore(reducer, initialState);

  const appWrapper = ({
    song,
    layout,
  }: {
    song: SongInterface;
    layout: SongLayout;
  }) =>
    render(
      <Provider store={store}>
        <Song song={song} layout={layout} />
      </Provider>
    );

  test('Renders all the necessary parts of the component', async () => {
    const song: SongInterface = {
      ...Favourites[0],
    };

    const layout = SongLayout.PORTRAIT;

    const wrapper = appWrapper({ layout, song });
    const portraitLayoutSong = await wrapper.findByTestId('song-portrait');
    const songTitle = await wrapper.findByTestId('song-title');
    const songThumbnail = await wrapper.findByTestId('song-thumbnail');
    const actionButton = await wrapper.findByTestId('manage-library-button');

    expect(portraitLayoutSong).toBeDefined();
    expect(songTitle).toBeDefined();
    expect(songThumbnail).toBeDefined();
    expect(actionButton).toBeDefined();
  });

  test('Renders in portrait mode when portrait layout is specified', async () => {
    const song: SongInterface = {
      ...Favourites[0],
    };

    const layout = SongLayout.PORTRAIT;

    const wrapper = appWrapper({ layout, song });
    const portraitLayoutSong = await wrapper.findByTestId('song-portrait');

    expect(wrapper).toBeDefined();
    expect(portraitLayoutSong).toBeDefined();
  });

  test('Renders in landscape mode when landscape layout is specified', async () => {
    const song: SongInterface = {
      ...Favourites[1],
    };

    const layout = SongLayout.LANDSCAPE;

    const wrapper = appWrapper({ layout, song });
    const landscapeLayoutSong = await wrapper.findByTestId('song-landscape');

    expect(wrapper).toBeDefined();
    expect(landscapeLayoutSong).toBeDefined();
  });
});
