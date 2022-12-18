import { FC, ReactNode } from 'react';
// project imports
/* import Customization from '../Customization'; */
import { styled } from '@mui/material/styles';
import Page from '@/components/shared/Page';
import AppBar from '@/components/shared/AppBar';

interface Props {
  children: ReactNode;
  title: string
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  [theme.breakpoints.down('md')]: {
    paddingTop: 42
  }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
  paddingTop: 70,
  [theme.breakpoints.down('md')]: {
    paddingTop: 60
  }
}));

const MinimalLayout: FC<Props> = ({ children, title }) => (
  <Page title={title} >
    <HeaderWrapper id="home">
      <AppBar />
      {/*   <Header /> */}
    </HeaderWrapper>
    {/*  <SecondWrapper>
          <Feature />
        </SecondWrapper> */}
    <SecondWrapper>
      {children}

    </SecondWrapper>
  </Page>
);

export default MinimalLayout;
