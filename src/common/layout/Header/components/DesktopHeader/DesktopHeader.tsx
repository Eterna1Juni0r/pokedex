import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, ThemeButton, Typography } from '@common';
import { ROUTES } from '@utils/constants';
import { useAuthState, useLogoutMutation } from '@utils/firebase';
import { setIsLogin } from '../../../../../utils/contexts/store/SessionSlice';

import styles from './DesktopHeader.module.css';

export const DesktopHeader: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();

  return (
    <div className={styles.desktop_header_container}>
      <div className={styles.desktop_header}>
        <div className={styles.menu_container}>
          <Typography variant='title'>Pokemon</Typography>
          <nav>
            <ul className={styles.navigation}>
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.POKEMONS}>Pokemons</Link>
                </Typography>
              </li>
              {authState.data?.uid && (
                <>
                  <li>
                    <Typography variant='title-regular'>
                      <Link to={ROUTES.PROFILE}>Profile</Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='title-regular'>
                      <Link to={ROUTES.SETTINGS}>Settings</Link>
                    </Typography>
                  </li>
                </>
              )}
              <li>
                <Typography variant='title-regular'>
                  <Link to={ROUTES.USERS}>Users</Link>
                </Typography>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.menu_container}>
          <ThemeButton />
          {authState.data && authState.data.photoURL && (
            <Link to={ROUTES.PROFILE}>
              <img src={authState.data.photoURL} alt='User avatar' />
            </Link>
          )}
          <Button
            onClick={() => {
              logoutMutation.mutate({});
              dispatch(setIsLogin(false));
            }}
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};
