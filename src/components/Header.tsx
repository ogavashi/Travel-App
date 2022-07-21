import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import caseSVG from "../assets/images/briefcase.svg";
import profileSVG from "../assets/images/user.svg";
import { logOut } from "../redux/auth/slice";

import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../redux/auth/selectors";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectCurrentToken);

  const user = useSelector(selectCurrentUser);
  const userName = user?.fullName;

  const onClickOut = () => {
    dispatch(logOut());
    navigate("/sign-in");
  };

  const onClickLogo = () => {
    if (isAuthorized) {
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div onClick={onClickLogo} className="header__logo">
          Travel App
        </div>
        {isAuthorized && (
          <nav className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link to="/bookings" className="nav-header__inner">
                  <span className="visually-hidden">Bookings</span>
                  <img src={caseSVG} alt=" icon" />
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div className="nav-header__inner profile-nav" tabIndex={0}>
                  <span className="visually-hidden">Profile</span>
                  <img src={profileSVG} alt="profile icon" />
                  <ul className="profile-nav__list">
                    <li className="profile-nav__item profile-nav__username">{userName}</li>
                    <li className="profile-nav__item">
                      <button onClick={onClickOut} className="profile-nav__sign-out button">
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
