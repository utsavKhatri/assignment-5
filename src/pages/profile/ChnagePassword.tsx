import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { DataState } from '../../context';
import { dataProviderProps } from '../../utils/types';
import { ChangePasswordSchema } from '../../utils/validations';

const ChnagePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleChnagePassword } = DataState() as dataProviderProps;

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
            my={3}
          >
            Change Password
          </Heading>
          <Formik
            initialValues={{
              email: '',
              currentPassword: '',
              newPassword: '',
              comfirmNewPassword: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={handleChnagePassword}
          >
            {({ errors, touched }) => (
              <Form>
                <Box>
                  <FormControl id="currentPassword" isRequired>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        error={
                          errors.currentPassword && touched.currentPassword
                        }
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
                    {errors.currentPassword && touched.currentPassword && (
                      <Text color="red.500">{errors.currentPassword}</Text>
                    )}
                  </FormControl>
                  <FormControl id="newPassword" isRequired>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        error={errors.newPassword && touched.newPassword}
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
                    {errors.newPassword && touched.newPassword && (
                      <Text color="red.500">{errors.newPassword}</Text>
                    )}
                  </FormControl>
                  <FormControl id="comfirmNewPassword" isRequired>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? 'text' : 'password'}
                        name="comfirmNewPassword"
                        error={
                          errors.comfirmNewPassword &&
                          touched.comfirmNewPassword
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
                    {errors.comfirmNewPassword &&
                      touched.comfirmNewPassword && (
                        <Text color="red.500">{errors.comfirmNewPassword}</Text>
                      )}
                  </FormControl>
                  <Button type="submit" mt={4} w={'full'}>
                    Change Password
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default ChnagePassword;
