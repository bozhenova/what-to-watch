import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderWrapper from '../header';
import Footer from '../footer';
import { Constants } from '../../constants';
import { Operations } from '../../redux/reducer/user/actions';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(Operations.authorize({ email, password }));
  };

  return (
    <div className='user-page'>
      <HeaderWrapper classModPrefix={`user-page`} />
      <div className='sign-in user-page__content'>
        <form action='#' className='sign-in__form' onSubmit={handleFormSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                autoComplete={'username'}
                value={email}
                onChange={handleEmailChange}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                value={password}
                autoComplete={'current-password'}
                onChange={handlePasswordChange}
                minLength={Constants.MIN_PASSWORD_LENGTH}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-password'
              >
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
