import React from 'react';

import { FormLabel, Input, Flex, Text } from '@chakra-ui/react';

// reusable component for label and input
const InputFields = React.forwardRef((props, ref) => {
  const {
    htmlFor,
    labelText,
    type,
    id,
    value,
    onChange,
    labelStyle,
    inputStyle,
  } = props;

  return (
    <Flex m="1rem">
      <FormLabel
        htmlFor={htmlFor}
        fontSize="xl"
        fontWeight="600"
        color="#464646"
        flex="1"
        {...labelStyle}
      >
        {labelText}
      </FormLabel>
      <Input
        flex="3"
        type={type || 'text'}
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        fontSize="md"
        {...inputStyle}
      />
    </Flex>
  );
});

export default InputFields;
