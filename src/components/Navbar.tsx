import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { DataState } from '../context';
import { dataProviderProps } from '../utils/types';
import { MESSAGES } from '../utils/contants';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { setUserProfile, userProfile } = DataState() as dataProviderProps;
  const toast = useToast();
  const router = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUserProfile(undefined);
    toast({
      title: MESSAGES.LoginSuccess,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    router('/login');
  };
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      h={'7vh'}
    >
      <HStack spacing={8} alignItems={'center'}>
        <Box as={Link} to={'/'}>
          E-Commerce
        </Box>
      </HStack>
      <Flex alignItems={'center'} gap={2}>
        <Button onClick={toggleColorMode} rounded={'full'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'sm'} title={userProfile?.firstName} />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={'/profile'}>
              Profile
            </MenuItem>
            <MenuItem as={Link} to={'/change-password'}>
              Change Password
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
