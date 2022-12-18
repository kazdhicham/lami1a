import React from 'react';

// material-ui
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import FollowerCard from '@/ui-component/cards/FollowerCard';
import MainCard from '@/ui-component/cards/MainCard';
import { gridSpacing } from '@/store/constants/constants';

import { IconSearch } from '@tabler/icons';

// types

import useViewer from '@/store/hooks/useViewer';

// ==============================|| SOCIAL PROFILE - FOLLOWERS ||============================== //

const Followers = () => {
  
  const {state:{discountProfiles}} = useViewer()

  const [search, setSearch] = React.useState<string | undefined>('');
  

  let discountsResult: React.ReactElement | React.ReactElement[] = <></>;
  if (discountProfiles) {
    discountsResult = discountProfiles.map((discount, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <FollowerCard {...follower} />
      </Grid>
    ));
  }

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Typography variant="h3">Followers</Typography>
          </Grid>
          <Grid item>
            <OutlinedInput
              size="small"
              id="input-search-user-profile"
              placeholder="Search Followers"
              value={search}
              onChange={handleSearch}
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
        {followersResult}
      </Grid>
    </MainCard>
  );
};

export default Followers;
