import React, { useEffect, useMemo, FC, ReactNode } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Container, AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalBar from './HorizontalBar';
/* import Customization from '../Customization'; */
import AuthGuard from 'utils/route-guard/AuthGuard';
import Breadcrumbs from '@/components/shared/extended/Breadcrumbs';
import menuItems from '@/menu-items/index'
import navigation from 'menu-items';
import { LAYOUT_CONST } from 'constant';
import useConfig from '@/store/hooks/useConfig';
import { drawerWidth } from '@/store/constants/constants';
/* import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store'; */

// assets
import { IconChevronRight } from '@tabler/icons';
import { NavItemTypeObject } from '@/types/index';

interface MainStyleProps {
  theme: Theme;
  open: boolean;
  layout: string;
}

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, layout }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginTop: 88
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px',
      marginTop: 88
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
    marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up('md')]: {
      marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      marginTop: 88
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      marginTop: 88
    }
  })
}));

interface Props {
  children: ReactNode;
  title: string
}

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout: FC<Props> = ({ children, title }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { drawerOpen, drawerType, container, layout, onChangeDrawer } = useConfig();

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      onChangeDrawer({ drawerType: 'default', drawerOpen: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerType]);

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      onChangeDrawer({ drawerType: 'default', drawerOpen: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchDownMd) {
      onChangeDrawer({ drawerType: 'default', drawerOpen: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

  const header = useMemo(
    () => (
      <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
        <Header />
      </Toolbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, matchDownMd]
  );
  const navigation = menuItems() as NavItemTypeObject[]

  return (<Box sx={{ display: 'flex' }}>
    <CssBaseline />
    {/* header */}
    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}
      sx={{ bgcolor: theme.palette.background.default }}>
      {header}
    </AppBar>

    {/* horizontal menu-list bar */}
    {layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd && <HorizontalBar />}

    {/* drawer */}
    {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd) && <Sidebar />}

    {/* main content */}
    <Main theme={theme} open={drawerOpen} layout={layout}>
      <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation}
          icon title rightAlign />
        {children}
      </Container>
    </Main>
    {/*   <Customization /> */}
  </Box>

  );
};

export default MainLayout;
