import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Constants, KeyCodes } from '../../constants';
import {
  getLoginData,
  getAuthorizationStatus
} from '../../redux/reducer/user/selectors';
import { ActionCreator } from '../../redux/reducer/user/actions';

const Header = ({ classMod = ``, match, title = `` }) => {
  const user = useSelector(getLoginData);
  const isAuthorizationRequired = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignInClick = () => {
    dispatch(ActionCreator.requiredAuthorization(true));
    history.push(Constants.LOGIN_PATH);
  };

  const onKeyPress = e => {
    if (e.key === KeyCodes.ENTER) {
      dispatch(ActionCreator.requiredAuthorization(true));
      history.push('/login');
    }
  };

  const Avatar = (
    <img
      src={`${Constants.URL}${user.avatarUrl}`}
      alt='User avatar'
      width='63'
      height='63'
    />
  );

  const isSignedIn = !isAuthorizationRequired ? (
    <div className='user-block__avatar'>
      <Link to={'/mylist'}>{Avatar}</Link>
    </div>
  ) : (
    <a
      className='user-block__link'
      onKeyPress={onKeyPress}
      onClick={onSignInClick}
      tabIndex={0}
    >
      Sign in
    </a>
  );

  const setHeaderTitle = match => {
    const { path, params } = match;

    switch (path) {
      case `/`:
        return <div className='user-block'>{isSignedIn}</div>;
      case `/film/:id`:
        return <div className='user-block'>{isSignedIn}</div>;
      case `/film/:id/review`:
        return (
          <>
            <nav className='breadcrumbs'>
              <ul className='breadcrumbs__list'>
                <li className='breadcrumbs__item'>
                  <Link to={`/film/${params.id}`} className='breadcrumbs__link'>
                    {title}
                  </Link>
                </li>
                <li className='breadcrumbs__item'>
                  <a className='breadcrumbs__link'>Add review</a>
                </li>
              </ul>
            </nav>
            <div className='user-block'>
              <div className='user-block__avatar'>{Avatar}</div>
            </div>
          </>
        );
      case `/mylist`:
        return (
          <>
            <h1 className='page-title user-page__title'>My list</h1>
            <div className='user-block'>
              <div className='user-block__avatar'>{Avatar}</div>
            </div>
          </>
        );
      case `/login`:
        return <h1 className='page-title user-page__title'>Sign in</h1>;
    }
  };

  return (
    <header className={`page-header ${classMod}`}>
      <div className='logo'>
        <Link to={'/'} className='logo__link'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </Link>
      </div>
      {setHeaderTitle(match)}
    </header>
  );
};

Header.propTypes = {
  classMod: PropTypes.string,
  match: PropTypes.object.isRequired,
  title: PropTypes.string
};

const HeaderWrapped = withRouter(Header);
export default HeaderWrapped;
