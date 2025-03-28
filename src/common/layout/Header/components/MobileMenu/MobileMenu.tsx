import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Divider, ThemeButton, Typography, UserCard } from '@common';
import { ROUTES } from '@utils/constants';
import { useAuthState, useLogoutMutation } from '@utils/firebase';
import { setIsLogin } from '../../../../../utils/contexts/store/SessionSlice';

import { Burger } from '../Burger/Burger';

import styles from './MobileMenu.module.css';

export const MobileMenu: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className={styles.mobile_header_container}>
      <div className={styles.mobile_header}>
        <Typography variant='title'>Pokemon</Typography>
        <div className={styles.menu_container}>
          <ThemeButton />
          <Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
        </div>
      </div>

      {isActive && (
        <div className={styles.navmenu}>
          {authState.data && <UserCard user={authState.data} />}
          <Divider title='NAVIGATION' />
          <nav>
            <ul aria-hidden onClick={() => setIsActive(false)} className={styles.navigation}>
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

          <Button
            onClick={() => {
              logoutMutation.mutate({});
              dispatch(setIsLogin(false));
            }}
          >
            LOGOUT
          </Button>
        </div>
      )}
    </div>
  );
};
