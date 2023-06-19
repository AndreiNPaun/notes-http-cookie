import { Box } from '@chakra-ui/react';

// component which will apply a background colour and border styling
const Card = (props) => {
  const { children, cardStyle } = props;
  return (
    <Box
      bg="white"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.26)"
      borderRadius="10px"
      {...cardStyle}
    >
      {children}
    </Box>
  );
};

export default Card;
