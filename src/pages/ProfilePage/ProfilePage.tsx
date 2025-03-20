import React from 'react';
import classnames from 'classnames';
import { Button, PokemonShortCard, Spinner, Typography, UserCard } from '@common';
import { useAuthState, useLogoutMutation } from '@utils/firebase';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../utils/contexts/store/SessionSlice';

import styles from './ProfilePage.module.css';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
  const logoutMutation = useLogoutMutation();

  if (!authState.data) return <Spinner />;
  const user = authState.data;

  return (
    <div className={classnames('page', styles.profile_container)}>
      <UserCard user={user} />
      <div>
        <Typography variant='title'>Team</Typography>
        <div className={styles.team}>
          {user.pokemons.map((pokemon) => (
            <PokemonShortCard key={pokemon.id} name={pokemon.name} />
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          logoutMutation.mutate({});
          dispatch(setIsLogin(false));
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};
