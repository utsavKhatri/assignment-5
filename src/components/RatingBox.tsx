import { Box } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface RatingProps {
  rating: number | undefined;
}
const RatingBox = ({ rating }: RatingProps) => {
  return (
    rating && (
      <Box display={'flex'} alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1', size: '12' }}
                  color={i < rating ? 'team.400' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf key={i} style={{ marginLeft: '1', size: '12' }} />
              );
            }
            return <BsStar key={i} style={{ marginLeft: '1', size: '12' }} />;
          })}
      </Box>
    )
  );
};

export default RatingBox;
