import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { setTheme, Theme } from './ThemeSlices';

export function useTheme() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const changeTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    setTheme: changeTheme
  };
}
