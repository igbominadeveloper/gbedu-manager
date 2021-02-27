import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoutIcon from '../../assets/logout.svg';
import SearchIcon from '../../assets/search.svg';
import Avatar from '../../assets/avatar.svg';

import { ReduxState } from '../../types';

import {
  getUserLastSearchResultError,
  getUserLastSearchResultRequestLoading,
  getUserLastSearchResultSuccess,
  logoutUser,
  searchSongsError,
  searchSongsRequestLoading,
  searchSongsSuccess,
} from '../../store/actions';
import * as Services from '../../services';

import { transformSearchResult } from '../../utils';

import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSearchQuery = useSelector((state: ReduxState) => state.searchQuery);

  const [searchQuery, setSearchQuery] = useState(userSearchQuery);

  const userProfile = useSelector((state: ReduxState) => state.userProfile);

  const userProfileImage = userProfile.images[0]?.url;

  const goToHomePage = () => history.push('/');
  const goToLoginPage = () => history.push('/login');

  useEffect(() => {
    const expirationTime = localStorage.getItem('expires_in');

    if (!expirationTime) return;

    if (new Date().getTime() > Number(expirationTime)) {
      goToLoginPage();
    }
  });

  const getUserLastSearchResult = useCallback(async () => {
    try {
      dispatch(getUserLastSearchResultRequestLoading());
      const response = await Services.getUserLastSearchResult();

      dispatch(
        getUserLastSearchResultSuccess({
          searchQuery: response.searchQuery,
          searchResult: response.searchResult,
        })
      );

      setSearchQuery(response.searchQuery);
    } catch (error) {
      console.log(error);

      dispatch(getUserLastSearchResultError(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserLastSearchResult();
  }, [getUserLastSearchResult]);

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
        dispatch(searchSongsError(error));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    performSongSearch(searchQuery);
  }, [searchQuery, performSongSearch]);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();

    goToLoginPage();
  };

  return (
    <nav>
      <ul className="nav-bar">
        <li className="nav-bar__user-profile pointer" onClick={goToHomePage}>
          <img
            src={userProfileImage || Avatar}
            alt="User Avatar"
            className="nav-bar__user-profile--avatar"
          />

          <span className="nav-bar__user-profile--username">
            {userProfile.display_name}
          </span>
        </li>

        <li className="nav-bar__search">
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

        <li className="nav-bar__logout pointer" onClick={logout}>
          <img src={LogoutIcon} alt="Logout Icon" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
