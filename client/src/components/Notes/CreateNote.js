import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitNote } from '../../store/action/note';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { Center } from '@chakra-ui/react';

const CreateNotes = () => {
  const dispatch = useDispatch();

  const [createNote, setCreateNote] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const inputNoteRef = useRef();

  const createNoteHandler = () => {
    setCreateNote(true);
  };

  const closeNoteHandler = () => {
    setCreateNote(false);
    setErrorMessage(null);
  };

  const submitNoteHandler = async () => {
    const formInput = inputNoteRef.current.value;

    if (formInput.trim() === '') {
      setErrorMessage('Field cannot be empty.');
      return;
    }

    dispatch(submitNote({ note: formInput }));
    inputNoteRef.current.value = '';
    setCreateNote(false);
  };

  // styles
  const cardStyle = {
    w: '90%',
    maxW: '50rem',
    m: '1rem auto',
  };

  const cardModalStyle = {
    maxW: '50rem',
    m: '10rem auto',
  };

  const propagationBoxStyle = {
    w: '40%',
    ml: '30%',
  };

  return (
    <>
      <Card cardStyle={cardStyle}>
        {!createNote && (
          <Center>
            <Button m="1rem" onClick={createNoteHandler}>
              Create a New Note
            </Button>
          </Center>
        )}
        {createNote && (
          <Modal
            cardStyle={cardModalStyle}
            propagationBox={propagationBoxStyle}
            modelText="Write your note in the field below"
            errorText={errorMessage}
            inputNoteRef={inputNoteRef}
            onClickCancel={closeNoteHandler}
            onClickSubmit={submitNoteHandler}
          />
        )}
      </Card>
    </>
  );
};

export default CreateNotes;
