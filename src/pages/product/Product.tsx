import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Carousel from '../../components/Carousel';
import { DataState } from '../../context';
import RatingBox from '../../components/RatingBox';
import { dataProviderProps } from '../../utils/types';

export default function Product() {
  const params = useParams();
  const { singleProduct, fetchSingleProduct } =
    DataState() as dataProviderProps;
  const router = useNavigate();
  useEffect(() => {
    if (params.id) {
      fetchSingleProduct(parseInt(params.id));
    } else {
      router('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 14, md: 20 }}
        >
          <Flex>
            <Carousel images={singleProduct?.images} />
          </Flex>
          <Stack spacing={{ base: 10, md: 14 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {singleProduct?.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
                fontFamily={'heading'}
              >
                {Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(singleProduct?.price || 0)}
              </Text>
              <Flex justifyContent={'start'} gap={1}>
                <Text as={'span'} fontWeight={'bold'}>
                  Rating:
                </Text>
                <RatingBox rating={singleProduct?.rating} />
              </Flex>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'} textAlign={'start'}>
                  {singleProduct?.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Discount:
                    </Text>{' '}
                    {singleProduct?.discountPercentage}%
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Stock:
                    </Text>{' '}
                    {singleProduct?.stock}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      brand:
                    </Text>{' '}
                    {singleProduct?.brand}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Category:
                    </Text>{' '}
                    {singleProduct?.category}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={'center'}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
