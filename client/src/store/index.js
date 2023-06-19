import { configureStore } from '@reduxjs/toolkit';

import loginSlice from './slice/login';
import noteSlice from './slice/note';

const store = configureStore({
  reducer: { login: loginSlice.reducer, note: noteSlice.reducer },
});

export default store;
