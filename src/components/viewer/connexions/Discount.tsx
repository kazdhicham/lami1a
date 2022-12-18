import React, { useState } from 'react';

// material-ui
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import DiscountCard from '@/components/viewer/cards/DiscountCard';
import MainCard from '@/ui-component/cards/MainCard';
import { gridSpacing } from '@/store/constants/constants';

import { IconSearch } from '@tabler/icons';

// types

import useViewer from '@/store/hooks/useViewer';

// ==============================|| SOCIAL PROFILE - FOLLOWERS ||============================== //

const Discount = () => {

  const { state: { discountProfiles }, searchProfile } = useViewer()
  const [search, setSearch] = useState('')
  let discountsResult: React.ReactElement | React.ReactElement[] = <></>;
  if (discountProfiles) {
    discountsResult = discountProfiles.map((discount, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <DiscountCard token={discount.token} flag={discount.flag} profileEmail={discount.profileEmail}
          profileId={discount.profileId} />
      </Grid>
    ));
  }

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Typography variant="h3">DiscountCard</Typography>
          </Grid>
          <Grid item>
            <OutlinedInput
              size="small"
              id="input-search-user-profile"
              placeholder="Search DiscountCard"
              value={search}
              onChange={() => searchProfile(search)}
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      }
    >
      <Grid container direction="row" spacing={gridSpacing}>
        {discountsResult}
      </Grid>
    </MainCard>
  );
};

export default DiscountCard;
