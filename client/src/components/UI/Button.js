import React from 'react';
import { Button as ButtonChakra } from '@chakra-ui/react';

const Button = (props) => {
  const { type, onClick, onBlur, children, ...styles } = props;

  return (
    <ButtonChakra
      type={type || 'button'}
      onClick={onClick}
      onBlur={onBlur}
      bg="#4f005f"
      border="1px solid #4f005f"
      color="white"
      _hover={{ bg: '#741188', borderColor: '#741188' }}
      _active={{ bg: '#741188', borderColor: '#741188' }}
      {...styles} // unique styles sent from component as array of styles
    >
      {children}
    </ButtonChakra>
  );
};

export default Button;
