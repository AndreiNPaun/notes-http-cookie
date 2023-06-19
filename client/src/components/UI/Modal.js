import React from 'react';
import Button from './Button';
import Card from './Card';
import { Center, Box, Text, Textarea } from '@chakra-ui/react';

const Modal = (props) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  // Background styling
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    w: '100%',
    h: '100vh',
    zIndex: '10',
    bg: 'rgba(0, 0, 0, 0.75)',
  };

  return (
    <Box {...backgroundStyle} onClick={props.onClickCancel}>
      <Box bg="green" sx={props.propagationBox} onClick={stopPropagation}>
        <Card cardStyle={props.cardStyle}>
          <Text p="1.5rem">{props.modelText}</Text>
          <Text pl="1.5rem" pb="0.3rem" color="red">
            {props.errorText}
          </Text>
          <Center>
            <Textarea w="90%" h="10rem" ref={props.inputNoteRef}></Textarea>
          </Center>
          <Center>
            <Button m="1rem" type="submit" onClick={props.onClickSubmit}>
              Submit Note
            </Button>
            <Button m="1rem" onClick={props.onClickCancel}>
              Close
            </Button>
          </Center>
        </Card>
      </Box>
    </Box>
  );
};

export default Modal;
