import React, { ReactElement, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@mui/material';

// project imports
import Logo from '@/components/shared/Logo';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons';
import MenuIcon from '@mui/icons-material/Menu';
import useProfile from '@/store/hooks/useProfile';

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });
  const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor: theme.palette.background.default,
      borderBottom: trigger ? 'none' : '1px solid',
      borderColor: trigger ? '' : darkBorder,
      color: theme.palette.text.dark
    }
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);

  const { state: { email } } = useProfile()
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  useEffect(() => {
    if (email) {
      console.log({ email })
    }
  }, [email])

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar>
            <Typography component={Link} href="/"
              sx={{ flexGrow: 1, textAlign: 'left' }}>
              <Logo />
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
              <Button color="inherit" component={Link} href="/" >
                Home
              </Button>
              {email &&

                <Button color="inherit" component={Link} href="/dashboard">
                  Dashboard
                </Button>
              }
              <Button color="inherit" component={Link} href="/selections" >
                Selections
              </Button>
              <Button color="inherit" component={Link} href="/collaborators" >
                Collaorators
              </Button>
              {
                email !== '' ?
                  <Button
                    component={Link}
                    href="/login"
                    disableElevation
                    variant="contained"
                    color="secondary"
                  >
                    Logout
                  </Button> :
                  <Button
                    component={Link}
                    href="/login"
                    disableElevation
                    variant="contained"
                    color="secondary"
                  >
                    Register / Login
                  </Button>
              }

            </Stack>

          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
