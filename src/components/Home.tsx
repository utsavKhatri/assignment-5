import { Flex, SimpleGrid, Spinner, Stack } from '@chakra-ui/react';
import Navbar from './Navbar';
import { DataState } from '../context';
import ProductCard from './ProductCard';
import { Pagination, ThemeProvider } from '@mui/material';
import { ProductsProps, dataProviderProps } from '../utils/types';

const Home = () => {
  const { paginatedProducts, totalPages, currentPage, setCurrentPage, theme } =
    DataState() as dataProviderProps;

  return (
    <>
      <Navbar />
      {paginatedProducts ? (
        <Flex
          p={4}
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 4, md: 6 }}
            w={'100%'}
            justifyContent={'space-between'}
            justifyItems={'center'}
          >
            {paginatedProducts.map((product: ProductsProps) => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                thumbnail={product.thumbnail}
                title={product.title}
                price={product.price}
                discountPercentage={product.discountPercentage}
                rating={product.rating}
                category={product.category}
              />
            ))}
          </SimpleGrid>

          <Stack
            spacing={2}
            direction={'row'}
            w={'full'}
            justifyContent={'center'}
            my={5}
            h={'full'}
          >
            <ThemeProvider theme={theme}>
              <Pagination
                count={totalPages || 0}
                page={currentPage}
                color="primary"
                onChange={(_event, page) => setCurrentPage(page)}
              />
            </ThemeProvider>
          </Stack>
        </Flex>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} h={'93vh'}>
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
};

export default Home;
