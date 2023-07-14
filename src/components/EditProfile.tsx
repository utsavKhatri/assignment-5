import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { DataState } from '../context';
import { dataProviderProps } from '../utils/types';

const EditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile, handleUpdateProfile } = DataState() as dataProviderProps;

  return (
    <>
      <Button
        flex={1}
        fontSize={'sm'}
        rounded={'full'}
        _focus={{
          bg: 'gray.200',
        }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg={useColorModeValue('white', 'gray.700')}>
              {userProfile && (
                <Formik
                  initialValues={{
                    email: userProfile?.email,
                    firstName: userProfile?.firstName,
                    lastName: userProfile?.lastName,
                    mobileNumber: userProfile?.mobileNumber,
                  }}
                  onSubmit={(values) => handleUpdateProfile(values, onClose)}
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
                            disabled
                            error={errors.email && touched.email}
                          />
                        </FormControl>
                        {errors.email && touched.email && (
                          <Text color="red.500">{errors.email}</Text>
                        )}
                        <FormControl id="firstName" isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name="firstName"
                            error={errors.firstName && touched.firstName}
                          />
                        </FormControl>
                        <FormControl id="lastName" isRequired>
                          <FormLabel>Last Name</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name="lastName"
                            error={errors.lastName && touched.lastName}
                          />
                        </FormControl>
                        <FormControl id="mobileNumber" isRequired>
                          <FormLabel>Mobile Number</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name="mobileNumber"
                            error={errors.mobileNumber && touched.mobileNumber}
                          />
                        </FormControl>
                        <Stack spacing={10}>
                          <Button
                            type="submit"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                              bg: 'blue.500',
                            }}
                          >
                            Update
                          </Button>
                        </Stack>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
