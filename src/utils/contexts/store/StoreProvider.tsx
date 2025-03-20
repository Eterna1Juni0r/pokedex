// App.tsx (или любой компонент верхнего уровня)
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../../firebase/hooks'; // предположим, ваш кастомный хук
import { setIsLogin } from './SessionSlice';
import type { AppDispatch } from './store';

export const StoreProvider = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAuthState();

  useEffect(() => {
    if (authState?.data) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  }, [authState, dispatch]);

  return <div>{children}</div>;
};
