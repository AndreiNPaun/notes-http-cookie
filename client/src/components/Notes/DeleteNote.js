import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '../UI/Button';

import { useDispatch } from 'react-redux';
import { deleteNote } from '../../store/action/note';

const DeleteNote = (props) => {
  const dispatch = useDispatch();

  const purge = async () => {
    console.log('deleted note: ', props.noteID);
    try {
      await dispatch(deleteNote({ token: props.token, noteId: props.noteID }));
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <HStack>
      <Button fontSize="md" borderRadius="8px" onClick={purge}>
        Delete
      </Button>
    </HStack>
  );
};

export default DeleteNote;
