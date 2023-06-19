import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const isAuthenticated = Cookies.get('Authenticated');

const initialState = {
  loginCheck: isAuthenticated || false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.loginCheck = action.payload.loginCheck;
    },
    logout(state) {
      state.loginCheck = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
