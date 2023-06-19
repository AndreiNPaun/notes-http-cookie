import Header from '../components/Header';

import { Grid, GridItem, Link, Text } from '@chakra-ui/react';

const Error = () => {
  return (
    <>
      <Header />
      <Grid placeItems="center" mt="5rem">
        <GridItem fontSize="4xl">Error 404</GridItem>
        <GridItem fontSize="xl">
          The page you were looking for was not found.
        </GridItem>
        <GridItem as={Link} fontSize="xl" color="#590bde" href="/">
          Click here to go back home.
        </GridItem>
      </Grid>
    </>
  );
};

export default Error;
