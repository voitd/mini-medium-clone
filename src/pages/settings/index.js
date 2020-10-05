import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import BackendErrorMessages from '../../components/BackendErrorMessages';
import { CurrentUserContext } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';

const Settings = () => {
  const USER_API_URL = '/user';
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(USER_API_URL);
  const [image, setImage] = useState('');
  const [username, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useLocalStorage('token');
  const [isSuccessLogout, setIsSuccessLogout] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const user = { ...currentUserState.currentUser, image, username, bio, email, password };
    doFetch({
      method: 'put',
      data: { user }
    });
  };

  const logout = e => {
    e.preventDefault();
    setToken('');
    dispatch({ type: 'LOGOUT' });
    setIsSuccessLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.isLoggedIn) {
      return;
    }
    const { image, username, bio, email } = currentUserState.currentUser;

    setImage(image);
    setUserName(username);
    setBio(bio);
    setEmail(email);
  }, [currentUserState.currentUser, currentUserState.isLoggedIn]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: 'SET_AUTORIZED', payload: response.user });
  }, [dispatch, response]);

  if (isSuccessLogout) {
    return <Redirect to="/" />;
  }
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>

                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
