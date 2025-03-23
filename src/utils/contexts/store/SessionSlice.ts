import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  id: number;
  name: string;
  image: string | null;
}

interface User {
  uid: string;
  pokemons: Pokemon[];
}

interface SessionState {
  isLogin: boolean;
  user: User | null;
}

const initialState: SessionState = {
  isLogin: false,
  user: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLogin = action.payload !== null;
    },
    addPokemonToUser(state, action: PayloadAction<Pokemon>) {
      if (state.user) {
        state.user.pokemons.push(action.payload);
      }
    }
  }
});

export const { setIsLogin, setUser, addPokemonToUser } = sessionSlice.actions;
export default sessionSlice.reducer;
