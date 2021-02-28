import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getUserProfileSuccess,
  logoutUser,
  searchSongsError,
  searchSongsRequestLoading,
  searchSongsSuccess,
} from '../../store/actions';

import * as Services from '../../services';

import { ReduxState } from '../../types';

import {
  convertUserStringToJson,
  errorHandler,
  transformSearchResult,
} from '../../utils';

import LogoutIcon from '../../assets/logout.svg';
import SearchIcon from '../../assets/search.svg';
import Avatar from '../../assets/avatar.svg';

import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const routeMatch = useLocation();

  const userSearchQuery = useSelector((state: ReduxState) => state.searchQuery);

  const [searchQuery, setSearchQuery] = useState(userSearchQuery);

  const userProfile = useSelector((state: ReduxState) => state.userProfile);

  const librarySize = useSelector(
    (state: ReduxState) => state.userLibrary.length
  );

  const userProfileImage = userProfile.images[0]?.url;

  const goToHomePage = () => history.push('/');

  const goToLoginPage = useCallback(() => {
    history.push('/login');
  }, [history]);

  const goToMyLibrary = () => history.push('/my-library');

  useEffect(() => {
    const token = localStorage.getItem('token');
    let authenticatedUser = localStorage.getItem('auth-user');

    if (!token) {
      history.push('/login');
      return;
    }

    if (authenticatedUser) {
      const hydratedUserObject = convertUserStringToJson(
        authenticatedUser || ''
      );

      dispatch(getUserProfileSuccess(hydratedUserObject));
      return;
    }
  }, [dispatch, history]);

  useEffect(() => {
    const expirationTime = localStorage.getItem('expires_in');

    if (!expirationTime) return;

    if (new Date().getTime() > Number(expirationTime)) {
      goToLoginPage();
    }
  }, [goToLoginPage]);

  useEffect(() => {
    if (userSearchQuery.length > 0) {
      setSearchQuery(userSearchQuery);
    }
  }, [userSearchQuery]);

  const performSongSearch = useCallback(
    async (searchParameter: string) => {
      try {
        if (!searchParameter) return;

        dispatch(searchSongsRequestLoading());
        const response = await Services.searchSongs(searchParameter);

        dispatch(
          searchSongsSuccess(transformSearchResult(response.data.tracks.items))
        );

        await Services.storeUserLastSearchQuery(
          searchParameter,
          transformSearchResult(response.data.tracks.items)
        );
      } catch (error) {
        toast.error(errorHandler(error.message));
        dispatch(searchSongsError(error.message));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    performSongSearch(searchQuery);
  }, [searchQuery, performSongSearch]);

  useEffect(() => {
    if (routeMatch.pathname === '/') {
    }

    return () => {};
  }, [routeMatch.pathname]);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();

    goToLoginPage();
  };

  return (
    <nav data-testid="navbar">
      <ul className="nav-bar">
        <li className="nav-bar__user-profile pointer" role="link">
          <div className="nav-bar__user-profile pointer" onClick={goToHomePage}>
            <img
              src={userProfileImage || Avatar}
              alt="User Avatar"
              className="nav-bar__user-profile--avatar"
              loading="lazy"
            />

            <p className="nav-bar__user-profile--username">
              {userProfile.display_name}
            </p>
          </div>

          <p className="nav-bar__link" onClick={goToMyLibrary}>
            <span>My Library</span>
            <span className="nav-bar__library-count">{librarySize}</span>
          </p>
        </li>

        <div className="nav-bar__actions">
          <li className="nav-bar__search" role="link">
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="nav-bar__search--icon"
            />

            <input
              type="search"
              placeholder="Search"
              className="nav-bar__search--input"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </li>

          <li className="nav-bar__logout pointer" onClick={logout} role="link">
            <img src={LogoutIcon} alt="Logout Icon" />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
