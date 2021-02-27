import { FunctionComponent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getTokenFromResponse } from '../../utils';
import {
  getUserProfileError,
  getUserProfileRequestLoading,
  getUserProfileSuccess,
} from '../../store/actions';
import * as Services from '../../services';

const Authentication: FunctionComponent = () => {
  const dispatch = useDispatch();

  const routeMatch = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (routeMatch.hash) {
      const { access_token, expires_in } = getTokenFromResponse(
        routeMatch.hash
      );

      const timeToExpiration = new Date().getTime() + Number(expires_in) * 1000;

      localStorage.setItem('token', access_token);
      localStorage.setItem('expires_in', String(timeToExpiration));

      const getUserProfile = async () => {
        try {
          dispatch(getUserProfileRequestLoading());
          const response = await Services.getUserProfile();
          const userProfile = response.data;
          dispatch(getUserProfileSuccess(userProfile));
          localStorage.setItem('auth-user', JSON.stringify(userProfile));
        } catch (error) {
          dispatch(getUserProfileError(error));
        }
      };

      getUserProfile();

      history.push('/');
    }
  }, [routeMatch.hash, dispatch, history]);

  return <div></div>;
};

export default Authentication;
