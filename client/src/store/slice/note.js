import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  note: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(state, action) {
      if (Array.isArray(action.payload)) {
        state.note = action.payload;
      } else {
        state.note.push(action.payload);
      }
    },
    removeNote(state, action) {
      state.note = state.note.filter((note) => note.id !== action.payload);
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
