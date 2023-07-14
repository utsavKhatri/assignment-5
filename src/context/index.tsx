import { useColorMode, useToast } from '@chakra-ui/react';
import { createTheme } from '@mui/material';
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  DataProviderProps,
  ProductsProps,
  ProfileProps,
  UserProfile,
  dataProviderProps,
} from '../utils/types';
import { decryptPassword, encryptPassword } from '../utils';

const stateContext = createContext<dataProviderProps | null>(null);

const DataProvider = ({ children }: DataProviderProps): JSX.Element => {
  const [productData, setProductData] = useState<ProductsProps[] | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [singleProduct, setSingleProduct] = useState<object | undefined>({});
  const [userProfile, setUserProfile] = useState<ProfileProps>();
  const toast = useToast();
  useEffect(() => {
    fetchProducts();
  }, []);
  const { colorMode } = useColorMode();
  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  const fetchCurrentUser = () => {
    if (localStorage.getItem('currentUser')) {
      setUserProfile(JSON.parse(localStorage.getItem('currentUser') as string));
    } else {
      setUserProfile(undefined);
    }
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products?limit=100'
      );

      setProductData(response.data.products);
      setTotalPages(Math.ceil(response.data.products.length / 8));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return productData?.slice(startIndex, endIndex);
  }, [currentPage, productData]);

  const handlePrevPage = (): void => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const fetchSingleProduct = async (id: number) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(response.data);
    } catch (error) {
      console.error('Error fetching single product:', error);
    }
  };

  const handleUpdateProfile = async (
    values: UserProfile,
    onClose: () => void
  ): Promise<void> => {
    const usersData: UserProfile[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
    const existingUserIndex = usersData.findIndex(
      (user: UserProfile) => user.email === values.email
    );

    if (existingUserIndex !== -1) {
      usersData[existingUserIndex] = {
        ...usersData[existingUserIndex],
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
      };

      localStorage.setItem('users', JSON.stringify(usersData));
      localStorage.setItem(
        'currentUser',
        JSON.stringify(usersData[existingUserIndex])
      );
      setUserProfile(usersData[existingUserIndex]);
      toast({
        title: 'Profile Updated',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Profile Update Failed',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleChnagePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    comfirmNewPassword: string;
  }) => {
    const { currentPassword, newPassword } = values;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const usersData: UserProfile[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
    const existingUserIndex = usersData.findIndex(
      (user: UserProfile) => user.email === currentUser?.email
    );
    if (currentUser) {
      if (existingUserIndex !== -1) {
        const decryptedPassword = await decryptPassword(currentUser.password);
        if (decryptedPassword === currentPassword) {
          const encryptedNewPassword = encryptPassword(newPassword);
          usersData[existingUserIndex] = {
            ...usersData[existingUserIndex],
            password: encryptedNewPassword,
          };
          localStorage.setItem('users', JSON.stringify(usersData));
          localStorage.setItem(
            'currentUser',
            JSON.stringify(usersData[existingUserIndex])
          );
          setUserProfile(usersData[existingUserIndex]);

          toast({
            title: 'Password Changed Successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        }
        toast({
          title: 'Password Incorrect',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Change Password Failed',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <stateContext.Provider
      value={{
        productData,
        handleNextPage,
        handlePrevPage,
        totalPages,
        fetchProducts,
        currentPage,
        paginatedProducts,
        setCurrentPage,
        fetchSingleProduct,
        singleProduct,
        theme,
        userProfile,
        setUserProfile,
        fetchCurrentUser,
        handleUpdateProfile,
        handleChnagePassword,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
export const DataState = () => {
  const data = useContext(stateContext);
  if (!data) {
    throw new Error('DataState must be used within a DataProvider');
  }
  return data;
};
export default DataProvider;
