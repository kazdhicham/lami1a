import { useEffect, useState } from 'react';
import Link from 'Link';
// material-ui
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';

// redux
import MainCard from '@/components/ui-component/cards/MainCard';
import SkeletonProductPlaceholder from '@/ui-component/cards/Skeleton/ProductPlaceholder';


// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// types
import { SelectionTypeData } from '@/api/selection/selection.types';
import useSnackbar from '@/store/hooks/useSnackbar';
import useCart from '@/store/hooks/useCart';

type SelectionCardProps = {
  titleSlug: string;
  image: string;
  title: string;
  description: string;
  promote: [string];
  products: [string];
  isLoading: boolean;
  author:string;
}
// ==============================|| PRODUCT CARD ||============================== //

const SelectionCard = ({ titleSlug, image, title, description, promote, products, isLoading, author }: SelectionCardProps) => {



  const [productRating] = useState<number | undefined>(promote?.length);
  const { state: { total, cartProducts } } = useCart()
  useState
  const { state: { openSnackBar } } = useSnackbar()
  /*  const addCart = () => {
 
     dispatch(
       openSnackbar({
         open: true,
         message: 'Add To Cart Success',
         variant: 'alert',
         alert: {
           color: 'success'
         },
         close: false
       })
     );
   };
  */
  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            padding: 'auto', margin: 'auto', maxWidth: 300,
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            }
          }}
        >
          <CardMedia
            sx={{ height: 220, maxWidth: 300 }}
            image={`${image}`}
            title={`${title}`}
            component={Link}
            href={`/selections/${titleSlug}`}
          />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component={Link}
                  href={`/selections/${titleSlug}`}
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  {title}
                </Typography>
              </Grid>
              {description && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      height: 45
                    }}
                  >
                    {description}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} sx={{ pt: '8px !important' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating precision={0.5} name="size-small" value={promote?.length} size="small" readOnly />

                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant="h4">{author}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{ color: 'grey.500', textDecoration: 'line-through' }}>
                        {products && products?.length && `${products?.length} Products`}
                      </Typography>
                    </Grid>
                  </Grid>

                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default SelectionCard;
