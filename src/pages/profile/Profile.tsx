import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EditProfile from '../../components/EditProfile';
import { DataState } from '../../context';
import { dataProviderProps } from '../../utils/types';

const Profile = () => {
  const { userProfile, fetchCurrentUser } = DataState() as dataProviderProps;
  const router = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem('currentUser') !== null &&
      localStorage.getItem('currentUser') !== undefined
    ) {
      fetchCurrentUser();
    } else {
      router('/');
    }
  }, [fetchCurrentUser, router]);

  return (
    <>
      <Navbar />
      <Flex
        w={'full'}
        minH={'93vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            textTransform={'uppercase'}
          >
            {userProfile?.firstName + ' ' + userProfile?.lastName}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {userProfile?.email}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {userProfile?.mobileNumber}
          </Text>

          <Stack mt={8} direction={'row'} spacing={4}>
            <EditProfile />
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              px={6}
              as={Link}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              to={'/change-password'}
            >
              Change Password
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Profile;
