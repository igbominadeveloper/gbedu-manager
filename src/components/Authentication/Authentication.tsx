import { FunctionComponent, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  getUserProfileError,
  getUserProfileRequestLoading,
  getUserProfileSuccess,
} from '../../store/actions';

import * as Services from '../../services';

import { getTokenFromResponse } from '../../utils';

const Authentication: FunctionComponent = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const getUserProfile = useCallback(async () => {
    try {
      dispatch(getUserProfileRequestLoading());

      const response = await Services.getUserProfile();
      const userProfile = response.data;

      localStorage.setItem('auth-user', JSON.stringify(userProfile));

      dispatch(getUserProfileSuccess(userProfile));
    } catch (error) {
      dispatch(getUserProfileError(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const { access_token, expires_in } = getTokenFromResponse(location.hash);

      const timeToExpiration = new Date().getTime() + Number(expires_in) * 1000;

      localStorage.setItem('token', access_token);
      localStorage.setItem('expires_in', String(timeToExpiration));

      getUserProfile().then(() => history.push('/'));
    }
  }, [location.hash, dispatch, history, getUserProfile]);

  return <div></div>;
};

export default Authentication;
