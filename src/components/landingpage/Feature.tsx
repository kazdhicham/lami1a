// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from '@/ui-component/cards/SubCard';
import Avatar from '@/ui-component/extended/Avatar';
import { gridSpacing } from '@/store/constants/constants';

// assets
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import ReorderTwoToneIcon from '@mui/icons-material/ReorderTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import { SelectionTypeData } from '@/api/selection/selection.types';
import useSelection from '@/store/hooks/useSelection'
// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
  const { state: { selections } } = useSelection()
  const SelectionsComponent = () => {
    if (selections && selections?.length > 0) {
      console.log({ selectionsFeatures: selections })
      return selections?.map((sel: SelectionTypeData) => (
        <Grid item md={4} sm={6}>
          <FadeInWhenVisible>
            <SubCard>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Avatar
                    size="xl"
                    variant="rounded"
                    sx={{
                      background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.primary.light,
                      color: theme.palette.primary.main
                    }}
                  >
                    <PaletteTwoToneIcon fontSize="large" />
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h3">{sel.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                   {sel.description}                  </Typography>
                </Grid>
              </Grid>
            </SubCard>
          </FadeInWhenVisible>
        </Grid>))
    } else return <></>
  }
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={5} md={10}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent={'center'}>
                <Grid item textAlign={'center'}>
                  <Typography variant="h5" color="primary">
                    Top selections
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} justifyContent='center'>
              <Typography variant="h2" component="div" textAlign={'center'}>
                What lami1a brings to you?
              </Typography>
            </Grid>
            <Grid item xs={12} justifyContent='center'>
              <Typography variant="body2">
                Selections from multiple holders all around the word.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
            {selections && selections.length > 0 && SelectionsComponent()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturePage;
