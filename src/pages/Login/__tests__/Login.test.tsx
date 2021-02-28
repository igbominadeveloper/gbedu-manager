import React from 'react';
import { render } from '@testing-library/react';

import Login from '../Login';

describe('Login Page', () => {
  const appWrapper = () => render(<Login />);

  test('It renders without crashing', () => {
    const wrapper = appWrapper();

    expect(wrapper).toBeDefined();
  });

  test('It renders a button to login on the page', async () => {
    const wrapper = appWrapper();

    const loginButton = await wrapper.findByTestId('login-button');
    expect(loginButton).toBeDefined();
  });
});
