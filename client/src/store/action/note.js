import { noteActions } from '../slice/note';
import { createAsyncThunk } from '@reduxjs/toolkit';

import useHttp from '../../hooks/useHttp';

export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async (_, { dispatch }) => {
    dispatch(noteActions.loading(true));
    try {
      const loadedNotes = [];

      const response = await useHttp({
        url: process.env.REACT_APP_NOTE_LIST,
      });

      const data = response.response;
      console.log(response);

      for (const key in data) {
        loadedNotes.push({
          id: data[key]._id,
          note: data[key].note,
        });
      }

      dispatch(noteActions.addNote(loadedNotes));
    } catch (error) {
      // if there is an authentication status error, attempt to refresh token
      if (error.response.status === 401) {
        await useHttp({
          method: 'post',
          url: 'http://localhost:8000/api/refresh-token',
        });
        dispatch(fetchNotes());
      } else {
        // store error message in redux and display for user to see
        dispatch(noteActions.setError(error.message));
        return false;
      }
    }

    dispatch(noteActions.loading(false));
  }
);

export const submitNote = createAsyncThunk(
  'note/addNote',
  async ({ note }, { dispatch }) => {
    try {
      const data = await useHttp({
        method: 'post',
        url: process.env.REACT_APP_NOTE_WRITE,
        values: { note },
      });

      const noteData = {
        note: data.note.note,
        id: data.note._id,
      };
      dispatch(noteActions.addNote(noteData));
    } catch (error) {
      dispatch(noteActions.setError(error.message));
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async ({ token, noteId }, { dispatch }) => {
    try {
      await useHttp({
        method: 'post',
        url: process.env.REACT_APP_NOTE_DELETE,
        values: { id: noteId },
        token,
      });

      dispatch(noteActions.removeNote(noteId));
    } catch (error) {
      dispatch(noteActions.setError(error.message));
    }
  }
);
