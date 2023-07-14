import { Formik, Form, Field } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { encryptPassword } from '../../utils';
import { SignupSchema } from '../../utils/validations';

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();
  const router = useNavigate();
  const handleSubmit = (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  }) => {
    // Check if email already exists in local storage
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = usersData.find(
      (user: { email: string }) => user.email === values.email
    );
    if (existingUser) {
      toast({
        title: 'Email already exists',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    // Encrypt the password (You can use any encryption method here)
    const encryptedPassword = encryptPassword(values.password);

    // Save user data in local storage
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: encryptedPassword,
      mobileNumber: values.mobileNumber,
    };
    usersData.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersData));

    // Perform any additional actions or redirect to another page
    toast({
      title: 'User registered',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    router('/login');
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              mobileNumber: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          name="firstName"
                          error={errors.firstName && touched.firstName}
                        />
                      </FormControl>
                      {errors.firstName && touched.firstName && (
                        <Text color="red.500">{errors.firstName}</Text>
                      )}
                    </Box>
                    <Box>
                      <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          name="lastName"
                          error={errors.lastName && touched.lastName}
                        />
                      </FormControl>
                      {errors.lastName && touched.lastName && (
                        <Text color="red.500">{errors.lastName}</Text>
                      )}
                    </Box>
                  </HStack>
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
                  <FormControl id="email" isRequired>
                    <FormLabel>Mobile Number</FormLabel>
                    <Field
                      as={Input}
                      type="mobileNumber"
                      name="mobileNumber"
                      error={errors.mobileNumber && touched.mobileNumber}
                    />
                  </FormControl>
                  {errors.mobileNumber && touched.mobileNumber && (
                    <Text color="red.500">{errors.mobileNumber}</Text>
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
                    {errors.password && touched.password && (
                      <Text color="red.500">{errors.password}</Text>
                    )}
                  </FormControl>
                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        error={
                          errors.confirmPassword && touched.confirmPassword
                        }
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword(
                              (setShowPassword) => !setShowPassword
                            )
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text color="red.500">{errors.confirmPassword}</Text>
                    )}
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user?{' '}
                      <Link color={'blue.400'} to={'/login'}>
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
