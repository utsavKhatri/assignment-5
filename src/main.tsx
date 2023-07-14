import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login.tsx';
import Profile from './pages/profile/Profile.tsx';
import Signup from './pages/auth/Signup.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import DataProvider from './context/index.tsx';
import Product from './pages/product/Product.tsx';
import ChangePassword from './pages/profile/ChangePassword.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    index: true,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  { path: '*', element: <h1>404</h1> },
  {
    path: '/product/:id',
    element: <Product />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </ChakraProvider>
);
