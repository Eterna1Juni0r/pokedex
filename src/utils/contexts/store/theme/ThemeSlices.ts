import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

// Берём сохранённую тему из localStorage или по умолчанию ставим 'dark'
const initialState: ThemeState = {
  theme: (localStorage.getItem('pokdex-theme') as Theme) || 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      // Сохраняем тему в localStorage
      localStorage.setItem('pokdex-theme', action.payload);
    }
  }
});

// Экспортируем экшены и редьюсер
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
