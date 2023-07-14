import { Dispatch, ReactNode, SetStateAction } from 'react';

export type dataProviderProps = {
  productData?: object[] | undefined;
  currentPage?: number;
  totalPages?: number;
  fetchProducts?: () => void;
  handleNextPage?: () => void;
  paginatedProducts?: object[] | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  fetchSingleProduct: (id: number) => void;
  singleProduct?: ProductsProps | undefined;
  // eslint-disable-next-line
  theme?: any;
  userProfile: ProfileProps | undefined;
  setUserProfile: Dispatch<SetStateAction<ProfileProps | undefined>>;
  fetchCurrentUser: () => void;
  handleUpdateProfile: (
    values: UserProfile,
    onClose: () => void
  ) => Promise<void>;
  handleChnagePassword: (values: {
    currentPassword: string;
    newPassword: string;
    comfirmNewPassword: string;
  }) => Promise<void>;
};

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password?: string;
}

export type ProductsProps = {
  discountPercentage?: number;
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

export interface DataProviderProps {
  children: ReactNode;
}

export interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}
