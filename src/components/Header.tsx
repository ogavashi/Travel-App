import { Link, useLocation, useNavigate } from "react-router-dom";
import caseSVG from "../assets/images/briefcase.svg";
import profileSVG from "../assets/images/user.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickOut = () => {
    navigate("/sign-in");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Travel App
        </Link>
        {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
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
                    <li className="profile-nav__item profile-nav__username">John Doe</li>
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
