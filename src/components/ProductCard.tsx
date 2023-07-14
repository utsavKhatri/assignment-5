import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RatingBox from './RatingBox';

interface ProductCardProps {
  id: number | undefined;
  discountPercentage: number | undefined;
  title: string | undefined;
  thumbnail: string | undefined;
  price: number | undefined;
  category: string | undefined;
  brand: string | undefined;
  rating: number | undefined;
}

function ProductCard({
  discountPercentage,
  title,
  thumbnail,
  category,
  brand,
  rating,
  price,
  id,
}: ProductCardProps) {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      maxW={{
        md: '345px',
      }}
      w={'full'}
      position="relative"
      bg={useColorModeValue('white', 'gray.900')}
      border={"none"}
      as={Link}
      justifyContent={'stretch'}
      to={`/product/${id}`}
    >
      <Image
        src={thumbnail}
        alt={`Picture of ${title}`}
        roundedTop="lg"
        height={200}
        width={'100%'}
        objectFit="fill"
      />
      <Box p="6">
        <Box
          display={'flex'}
          alignItems="center"
          justifyContent={'space-between'}
        >
          {discountPercentage && (
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
              {discountPercentage}%
            </Badge>
          )}
          <Box
            fontSize="xl"
            fontWeight="semibold"
            color={useColorModeValue('gray.800', 'white')}
          >
            {Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(price || 0)}
          </Box>
        </Box>
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>

          <RatingBox rating={rating} />
        </Flex>

        <Flex justifyContent="space-between" alignContent="center">
          <Flex direction={'column'}>
            <Text color={useColorModeValue('gray.800', 'white')} mb={0}>
              Brand: {brand}
            </Text>
            <Text color={useColorModeValue('gray.800', 'white')}>
              Category: {category}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProductCard;
