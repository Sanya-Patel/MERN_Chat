import React, { useEffect } from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats")
    }
  }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        display='flex'
        justifyContent='center'
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize='4xl' fontFamily='Work sans' color='black'>CHAT-X</Text>
      </Box>
      <Box bg='white' w="100%" p={4} borderRadius='lg' color='black' borderWidth='1px'>
        <Tabs variant='soft-rounded'>
          <TabList>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
