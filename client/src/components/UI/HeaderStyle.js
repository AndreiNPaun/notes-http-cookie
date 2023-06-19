import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link } from '@chakra-ui/react';

const HeaderStyle = (props) => {
  const { logo, links } = props;

  return (
    <Box bg="#32085c" p={1}>
      <Flex
        w="80%"
        mx="auto"
        direction="row"
        justify="space-between"
        align="center"
      >
        <Box>
          <Link
            as={RouterLink}
            to="/"
            fontSize="1.8rem"
            fontWeight="600"
            color="white"
            _hover={{ textDecoration: 'none' }}
          >
            {logo}
          </Link>
        </Box>
        <Box h="full">
          {links.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              onClick={link.onClick}
              fontSize="1.4rem"
              color="white"
              p=".8rem 1rem"
              _hover={{
                textDecoration: 'none',
                background: 'purple.500',
                active: 'purple.500',
              }}
            >
              {link.text}
            </Link>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderStyle;
