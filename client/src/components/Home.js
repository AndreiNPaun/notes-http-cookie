import React, { useEffect, useState } from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/slice/login';

import CreateNotes from './Notes/CreateNote';
import ListNotes from './Notes/ListNotes';

import Card from './UI/Card';

const Home = () => {
  const cardStyle = {
    w: '90%',
    maxW: '60rem',
    m: '2rem auto',
    p: '2rem',
  };

  const dispatch = useDispatch();

  const login = useSelector((state) => state.login.loginCheck);
  // const refreshToken = useSelector((state) => state.login.refreshToken);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(
    <Card cardStyle={cardStyle}>
      <Center m="1rem">
        <Flex flexDirection="column">
          <Text p="1rem" m="0 auto" fontSize="3xl" color="#464646">
            Welcome to Notes
          </Text>
          <Text fontSize="xl" color="#464646">
            This is an interactive notes app, developed using the MERN stack.
          </Text>
        </Flex>
      </Center>
    </Card>
  );

  // if token expires check for refreshToken and renew token
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!token && refreshToken) {
  //       const url = process.env.REACT_APP_REFREH_TOKEN;

  //       try {
  //         const response = await axios.post(
  //           url,
  //           {
  //             refreshToken: refreshToken,
  //           },
  //           {
  //             headers: { 'Content-Type': 'application/json' },
  //           }
  //         );

  //         dispatch(loginActions.login({ token: response.data.token }));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (login) {
      setContent(
        <>
          <CreateNotes />
          <ListNotes />
        </>
      );
    }
    setLoading(false);
  }, [login]);

  return loading ? <p>Loading...</p> : <>{content}</>;
};

export default Home;
