import { noteActions } from '../slice/note';
import { createAsyncThunk } from '@reduxjs/toolkit';

// part of the demo
import Cookies from 'js-cookie';

import useHttp from '../../hooks/useHttp';

export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async (_, { dispatch }) => {
    const tokenTest = Cookies.get('token');
    console.log('Token from cookie', tokenTest);

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
      dispatch(noteActions.setError(error.message));
      return false;
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
      console.error('Error:', error);
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
