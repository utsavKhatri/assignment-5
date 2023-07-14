import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { decryptPassword } from '../../utils';
import { LoginSchema } from '../../utils/validations';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = usersData.find(
      (user: { email: string }) => user.email === values.email
    );

    if (existingUser) {
      const decryptedPassword = await decryptPassword(existingUser.password);
      if (decryptedPassword === values.password) {
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        router('/');
        return;
      }
      toast({
        title: 'Password Incorrect',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login Failed',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      error={errors.email && touched.email}
                    />
                  </FormControl>
                  {errors.email && touched.email && (
                    <Text color="red.500">{errors.email}</Text>
                  )}
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        error={errors.password && touched.password}
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  {errors.password && touched.password && (
                    <Text color="red.500">{errors.password}</Text>
                  )}
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Text>
                        Already registered? <Link to={'/signup'}>Sign Up</Link>
                      </Text>
                    </Stack>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
