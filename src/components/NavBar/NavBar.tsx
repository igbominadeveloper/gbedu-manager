import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoutIcon from '../../assets/logout.svg';
import SearchIcon from '../../assets/search.svg';
import Avatar from '../../assets/avatar.svg';

import { ReduxState } from '../../types';

import {
  logoutUser,
  searchSongsError,
  searchSongsRequestLoading,
  searchSongsSuccess,
} from '../../store/actions';
import * as Services from '../../services';

import { transformSongs } from '../../utils';

import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userProfile = useSelector((state: ReduxState) => state.userProfile);

  const userProfileImage = userProfile.images[0]?.url;

  const goToHomePage = () => history.push('/');

  useEffect(() => {
    const expirationTime = localStorage.getItem('expires_in');

    if (!expirationTime) return;

    if (new Date().getTime() > Number(expirationTime)) {
      goToHomePage();
    }
  });

  const performSongSearch = async (searchParameter: string) => {
    try {
      dispatch(searchSongsRequestLoading());
      const response = await Services.searchSongs(searchParameter);

      dispatch(searchSongsSuccess(transformSongs(response.data.tracks.items)));
    } catch (error) {
      dispatch(searchSongsError(error));
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();

    history.push('/login');
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
            onChange={(event) => performSongSearch(event.target.value)}
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
