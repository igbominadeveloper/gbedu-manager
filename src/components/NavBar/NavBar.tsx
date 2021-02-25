import { useHistory } from 'react-router-dom';

import LogoutIcon from '../../assets/logout.svg';
import SearchIcon from '../../assets/search.svg';
import Avatar from '../../assets/avatar.svg';

import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();

  const goToHomePage = () => history.push('/');

  return (
    <nav>
      <ul className="nav-bar">
        <li className="nav-bar__user-profile pointer" onClick={goToHomePage}>
          <img
            src={Avatar}
            alt="User Avatar"
            className="nav-bar__user-profile--avatar"
          />

          <span className="nav-bar__user-profile--username">Username</span>
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
          <img src={LogoutIcon} alt="" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
