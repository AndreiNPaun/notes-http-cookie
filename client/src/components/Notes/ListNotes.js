import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../../store/action/note';

import DeleteNote from './DeleteNote';
import Card from '../UI/Card';
import { Flex, UnorderedList, ListItem, Box } from '@chakra-ui/react';

const ListNotes = () => {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login.loginCheck);
  const notes = useSelector((state) => state.note.note);
  const notesList = Object.values(notes);

  const error = useSelector((state) => state.note.error);
  const loading = useSelector((state) => state.note.loading);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  let content = <p>Found no notes.</p>;

  if (loading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (notesList.length > 0) {
    content = (
      <UnorderedList listStyleType="none">
        {notesList.map((note) => (
          <Flex
            key={note.id}
            justifyContent="space-between"
            borderBottom="solid #464646"
            p="0.75rem"
          >
            <ListItem
              key={note.id}
              m="1rem"
              color="#464646"
              sx={{ wordWrap: 'break-word', maxWidth: '80%' }}
            >
              {note.note}
            </ListItem>
            <DeleteNote noteID={note.id} login={login} />
          </Flex>
        ))}
      </UnorderedList>
    );
  }

  // styles
  const cardStyle = {
    w: '90%',
    maxW: '50rem',
    m: '1rem auto',
  };

  return (
    <Card cardStyle={cardStyle}>
      <Box m="2rem auto" p="2rem" h="auto">
        {content}
      </Box>
    </Card>
  );
};

export default ListNotes;
