import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutIcon from '../../assets/logout.svg';
import SearchIcon from '../../assets/search.svg';
import Avatar from '../../assets/avatar.svg';

import { ReduxState } from '../../types';

import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();

  const userProfile = useSelector((state: ReduxState) => state.userProfile);

  const userProfileImage = userProfile.images[0]?.url;

  const goToHomePage = () => history.push('/');

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
          />
        </li>

        <li className="nav-bar__logout pointer">
          <img src={LogoutIcon} alt="Logout Icon" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
