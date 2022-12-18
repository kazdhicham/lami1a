import { useState, useEffect, ReactElement, } from 'react';

import { Button, ButtonBase, Container, Grid, Typography } from '@mui/material';
import Link from 'Link';
// project imports

import FadeInWhenVisible from './Animation';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { gridSpacing } from '@/store/constants/constants';
import { SelectionTypeData } from '@/api/selection/selection.types';
import useSelection from '@/store/hooks/useSelection';
import ProductEmpty from '@/components/selections/Products/ProductEmpty'
import SelectionCard from '@/components/selections/cards/SelectionCard'
// ==============================|| LANDING - DEMOS PAGE ||============================== //

const SelectionsFront = () => {
  const { state: { selections } } = useSelection()
  let selectionResult: ReactElement | ReactElement[] = <></>;

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (!isLoading) {
    if (selections && selections.length > 0) {
      selectionResult = selections.map((selection: SelectionTypeData, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <SelectionCard
            titleSlug={selection.titleSlug}
            image={selection.image.url}
            title={selection?.title}
            description={selection?.description}
            promote={selection.promote}
            isLoading={isLoading}
            products={selection.products}
            status={selection.status}

          />
        </Grid>
      ));
    } else {
      selectionResult = (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <ProductEmpty />
        </Grid>
      );
    }
  }

  return (
    <Container >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} textAlign={'center'} >
          <Typography variant="h2" component="div" >
            Top selections
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Typography variant="body2">
            Selections from multiple holders all around the word.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>

            {selections && selectionResult}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
          <AnimateButton>
            <Button component={Link} href="/selections" variant="outlined">
              Explore Selections
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Container >
  );
}

export default SelectionsFront;
