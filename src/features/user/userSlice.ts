import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  provider: string | null;
  name: string | null;
}

const initialState: UserState = {
  email: null,
  provider: null,
  name: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; provider: string, name: string; }>
    ) => {
      state.email = action.payload.email;
      state.provider = action.payload.provider;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.email = null;
      state.provider = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;