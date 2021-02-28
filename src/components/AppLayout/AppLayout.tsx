import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';

import { getUserProfileSuccess } from '../../store/actions';

import { convertUserStringToJson } from '../../utils';

interface AppLayoutProps {
  component: any;
  exact: boolean;
  path: string;
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({
  component: Component,
  path,
  exact,
  ...rest
}: AppLayoutProps) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  useEffect(() => {
    let authenticatedUser = localStorage.getItem('auth-user');

    if (!authenticatedUser) return;

    const hydratedUserObject = convertUserStringToJson(authenticatedUser || '');

    dispatch(getUserProfileSuccess(hydratedUserObject));
  }, [dispatch]);

  return (
    <>
      <NavBar />

      <Route
        {...rest}
        render={(props) =>
          token ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </>
  );
};

export default AppLayout;
