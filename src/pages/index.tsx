import React, { useEffect, ReactElement } from 'react';
import { NextPage } from 'next'
// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Layout from 'layout';
import Page from '@/components/ui-component/Page';
import SelectionFront from '@/components/landingpage/Selections-front';
import Layouts from 'components/landingpage/Layouts';
import KeyFeature from 'components/landingpage/KeyFeature';
import Subscribe from 'components/landingpage/Subscribe';
import Footer from 'components/landingpage/Footer';
//import Customization from 'layout/Customization';
import AppBar from '@/ui-component/extended/AppBar';
import ViewerModel from '@/api/viewer/Viewer.model'
import useSelection from '@/store/hooks/useSelection';
import { SelectionTypeData } from '@/api/selection/selection.types'; import useLocalStorage from '@/store/hooks/useLocalStorage'
import useProfile from '@/store/hooks/useProfile'
import useCart from '@/store/hooks/useCart'
import { ViewerTypeData } from '@/api/viewer/viewer.types';
import { dbFirestore } from '@/api/fb-utils-admin'

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  [theme.breakpoints.down('md')]: {
    paddingTop: 42
  }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
  paddingTop: 160,
  [theme.breakpoints.down('md')]: {
    paddingTop: 60
  }
}));
const SelectionWrapper = styled('div')(({ theme }) => ({
  paddingTop: 16,


  [theme.breakpoints.down('md')]: {

    paddingTop: 6,
  }
}));

// =============================|| LANDING MAIN ||============================= //

interface InitialProps {
  collaborators: ViewerTypeData[];
  loading?: boolean;
  selections: SelectionTypeData[];
}
type Props = InitialProps
const Landing: NextPage<Props, InitialProps> = ({ collaborators, selections }: { collaborators: Array<ViewerTypeData>, selections: Array<SelectionTypeData>, loading: boolean }) => {
  const [storedValue,] = useLocalStorage('localCart', {})
  const { state: { cartProducts }, setCartProducts, setSubTotal } = useCart()
  const { state: { email } } = useProfile()
  const { setCollaborators, setSelections } = useSelection()
  useEffect(() => {
    if (email === null || email === '') {
      window.localStorage.removeItem('authtoken')
    }
    if (cartProducts && cartProducts?.length === 0 && storedValue?.productsCart?.length >= 1
      && typeof storedValue.productsCart !== 'undefined' &&
      storedValue.productsCart.quantity !== 0 && storedValue.subtotal !== 0) {
      setSubTotal(storedValue.subtotal)
      setCartProducts(storedValue.products)
    } else {
      window.localStorage.removeItem('localCart')
    }
  }, [cartProducts, email, storedValue]);
  useEffect(() => {
    if (collaborators !== null && typeof collaborators !== 'undefined' && Array.isArray(collaborators)) {
      const globalCollaborators = collaborators.map((coll) => {
        const { _id, login, email, phone, instagram, website, avatar: { url }, coords: { lat, long },
          addressGeo, bio, enrollmentAll } = coll

        return { _id, login, email, phone, instagram, website, avatar: { url }, coords: { lat, long }, addressGeo, bio, enrollmentAll }
      })
      setCollaborators(globalCollaborators)
    }

  }, [collaborators])
  useEffect(() => {

    if (selections !== null && typeof selections !== 'undefined') {
      console.log({ selections })
      setSelections(selections)
    }
  }, [selections])


  return (
    <Layout variant="minimal" title="Welcome to lami1a shopping place " >
      <>

        {/*  <SecondWrapper>
          <Feature />
        </SecondWrapper> */}
        <SelectionWrapper>
          <SelectionFront />
        </SelectionWrapper>
        <SecondWrapper>
          <Layouts />
        </SecondWrapper>
        <SecondWrapper>
          <KeyFeature />
        </SecondWrapper>
        <SecondWrapper>
          <Subscribe />
        </SecondWrapper>
        <Footer />
        {/* <Customization /> */}
      </>
    </Layout>)
}
/* 
Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="minimal">{page}</Layout>;
}; */

export default Landing;

export async function getStaticProps() {

  const collaborators: unknown[] = [];
  const docs = await ViewerModel.find({ role: { $in: ['COLL', 'ORGA', 'LIIS'] } }).exec()
  docs.forEach((doc: ViewerTypeData) => {
    const { _id, createdAt, updatedAt, login, email, organisation = null, role = null, website = null, coords, addressGeo,
      instagram = null, stripe_account_id = null, phone = null, avatar, walletId = null, bio = null } = doc._doc
    /**_id, login, email, phone, instagram, website, avatar: { url }, coords: { lat, long }, addressGeo, bio */
    collaborators.push({
      _id: _id.toString(),
      login, email, stripe_account_id,
      phone, bio, role, website, instagram, organisation, walletId, addressGeo,
      createdAt: JSON.stringify(createdAt),
      coords,
      avatar: JSON.stringify(avatar),
      updatedAt: JSON.stringify(updatedAt),

    });
  });


  const selections: SelectionTypeData[] = [];
  const querySnapshot = await dbFirestore.collection('selections').get()
  querySnapshot.forEach((doc: unknown) => {

    selections.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      collaborators,
      loading: false,
      selections
    },
    revalidate: 600
  }

}