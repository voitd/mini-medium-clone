import React, { useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const { isLoggedIn, currentUser } = currentUserState;
  const { username, image } = currentUser;
  console.log('currentUser -> ', currentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {!isLoggedIn && (
            <Fragment>
              {' '}
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </Fragment>
          )}
          {isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/article/new" className="nav-link">
                  <i className="ion-compose"></i>
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/profiles/${username}`} className="nav-link">
                  <img className="user-pic" src={image} alt={username} />
                  &nbsp; {username}
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
