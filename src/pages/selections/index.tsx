import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    Container,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { dbFirestore } from '@/api/fb-utils-admin'

import useLocalStorage from '@/store/hooks/useLocalStorage'

// project imports
import Layout from 'layout';
import Page from '@/components/ui-component/Page';
import SortOptions from 'components/application/e-commerce/Products/SortOptions';
import ProductEmpty from 'components/application/e-commerce/Products/ProductEmpty';
import ProductFilter from 'components/application/e-commerce/Products/ProductFilter';
import ProductFilterView from 'components/application/e-commerce/Products/ProductFilterView';
import SelectionCard from '@/components/selections/cards/SelectionCard';
import FloatingCart from '@/ui-component/cards/FloatingCart';
import SkeletonProductPlaceholder from '@/ui-component/cards/Skeleton/ProductPlaceholder';
import useConfig from '@/store/hooks/useConfig';
import { appDrawerWidth, gridSpacing } from '@/store/constants/constants';


// assets
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

// types

import useSelection from '@/store/hooks/useSelection'
import useCart from '@/store/hooks/useCart';
import { SelectionTypeData } from '@/api/selection/selection.types';
// product list container
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginRight: -appDrawerWidth,
    [theme.breakpoints.down('xl')]: {
        paddingRight: 0,
        marginRight: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginRight: 0
    })
}));

const filterIsEqual = (a1: ProductsFilter, a2: ProductsFilter) =>
    a1 === a2 ||
    (a1.length === a2.length &&
        a1.search === a2.search &&
        a1.sort === a2.sort &&
        a1.price === a2.price &&
        a1.rating === a2.rating &&
        JSON.stringify(a1.gender) === JSON.stringify(a2.gender) &&
        JSON.stringify(a1.categories) === JSON.stringify(a2.categories) &&
        JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const Selections = ({selections, isLoading}:{isLoading: boolean, selections: SelectionTypeData[]}) => {
    const { state, setSelections } = useSelection()
    let selectionResult: ReactElement | ReactElement[] = <></>;

    useEffect(() => {
        if(selections && selections?.length && selections[0] !== null && typeof selections[0] !== undefined){

            setSelections(selections)
        }
    }, [selections])
    
console.log({ selections})
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
                        All  selections  From regional collaborators
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
            </Grid>
        </Container >
    );
}


Selections.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant='minimal' title="selections of lami1a collaborators " >{page}</Layout>;
};

export default Selections;

export async function getStaticProps() {

  

    const selections: SelectionTypeData[] = [];
    const querySnapshot = await dbFirestore.collection('selections').get()
    querySnapshot.forEach((doc: unknown) => {

        selections.push({ id: doc.id, ...doc.data() });
    });

    return {
        props: {
            loading: false,
            selections
        },
        revalidate: 600
    }

}