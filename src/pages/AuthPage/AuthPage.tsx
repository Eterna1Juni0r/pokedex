import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, GoogleButton } from '@common';
import { ROUTES } from '@utils/constants';
import { useLogInWithGoogleMutation } from '@utils/firebase';
import { setIsLogin, setUser } from '../../utils/contexts/store/SessionSlice';

import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

import type { RootState } from '../../utils/contexts/store/store';

import styles from './AuthPage.module.css';

export const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = React.useState(false);

  const user = useSelector((state: RootState) => state.session.user);

  const { mutate: logInWithGoogleMutate } = useLogInWithGoogleMutation({
    options: {
      onSuccess: () => {
        dispatch(setIsLogin(true));
        dispatch(setUser(user));
        navigate(ROUTES.POKEMONS);
      }
    }
  });

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.images_container}>
          <div className={styles.logo} />
          <div className={styles.cover} />
        </div>

        <div className={styles.content}>
          <div className={styles.form_container}>
            {!isSignUp && <SignInForm />}
            {isSignUp && <SignUpForm />}
            <Button variant='text' onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'already have account' : 'create new account'}
            </Button>
          </div>

          <div className={styles.authWith_container}>
            <Divider title='OR' />
            <GoogleButton onClick={() => logInWithGoogleMutate({})}>Login with GOOGLE</GoogleButton>
          </div>
        </div>
      </div>
    </section>
  );
};
