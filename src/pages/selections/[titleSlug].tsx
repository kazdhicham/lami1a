import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { sum } from 'lodash'

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import Layout from 'layout';
import Page from '@/components/shared/Page';
import SortOptions from '@/components/selections/Products/SortOptions';
import ProductEmpty from '@/components/selections/Products/ProductEmpty';
import ProductFilter from '@/components/selections/Products/ProductFilter';
import ProductFilterView from '@/components/selections/Products/ProductFilterView';
import ProductCard from '@/components/selections/cards/ProductCard';
import FloatingCart from '@/components/shared/FloatingCart';
import SkeletonProductPlaceholder from '@/components/selections/Products/ProductPlaceholder';
import useConfig from '@/store/hooks/useConfig';
import { appDrawerWidth, gridSpacing } from '@/store/constants/constants';
import { SelectionTypeData } from '@/api/selection/selection.types';
import { dbFirestore } from '@/api/fb-utils-admin';
import useLocalStorage from '@/store/hooks/useLocalStorage'
import { useLazyQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/product/queries'
// assets
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

// types

import useCart from '@/store/hooks/useCart';
import { ProductTypeData, ProductsFilter } from '@/api/product/product.types';
import useProduct from '@/store/hooks/useProduct';

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

const ProductsList = ({ selection }: { selection: SelectionTypeData }) => {
  console.log({ selection })
  const theme = useTheme();

  const { borderRadius } = useConfig();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const { state: { products }, setProducts } = useProduct()
  const { state: { cartProducts, step }, resetCart, setCartProducts, setSubTotal } = useCart()
  const { onChangeDrawer } = useConfig()
  const [productsState, setProductsState] = useState<ProductTypeData[] | null>(null)
  const [page, setPage] = useState(1)
  const [GetProducts, { data: productsData, loading: productsLoading, error: productsError }] =
    useLazyQuery(GET_PRODUCTS)
  const [productsPaged, setProductsPaged] = useState<Array<Array<ProductTypeData>> | undefined>()

  // product data


  const [storedValue,] = useLocalStorage('localCart', {})

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // drawer
  const [open, setOpen] = useState(isLoading);
  const handleDrawerOpen = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setOpen(!matchDownLG);
  }, [matchDownLG]);

  const returnProductsArrays = (items: ProductTypeData[]) => {
    const TwoDimensionalArray = [];
    if (items?.length > 9) {
      const remainder = items.length % 9;
      let i = 1;
      while (i < items.length - remainder) {
        const array = items.slice(i, i + 9);
        TwoDimensionalArray.push(array);
        i += 9;
      }
      const array = items.slice(i)
      TwoDimensionalArray.push(array);
      return TwoDimensionalArray
    } else {
      const array = items?.slice(0)
      TwoDimensionalArray.push(array);
      return TwoDimensionalArray;
    }
  };
  useEffect(() => {
    if (productsData && !productsError && !productsLoading) {
      console.log({ productsData })
      setProducts(productsData.products)
    }
  }, [productsData, productsError, productsLoading])

  useEffect(() => {
    if (productsState) {
      setProductsPaged(returnProductsArrays(productsState))
    }

  }, [productsState])
  useEffect(() => {
    console.log(selection.titleSlug)
    GetProducts({
      variables: {
        titleSlug: selection.titleSlug
      }
    })
  }, [selection.titleSlug])
  // const router = useRouter()
  useEffect(() => {
    if (typeof cartProducts !== 'undefined' && cartProducts.length === 0 && storedValue !== null && typeof storedValue !== 'undefined') {
      console.log({ storedValue })
      setSubTotal(storedValue.subtotal)
      setCartProducts(storedValue.products)
    }
  }, []);
  useEffect(() => {
    if (typeof cartProducts !== 'undefined' && cartProducts[0]?.quantity !== 0) {
      const subtt = sum(cartProducts.map((prod) => prod.quantity * (prod.price * (1 - (prod.promo ? prod.promo / 100 : 0)))))
      setSubTotal(subtt)
      console.log({ subtt })
      console.log({ cartProducts })
    } else {
      window.localStorage.removeItem('localCart')
    }
  }, [cartProducts])

  useEffect(() => {
    if (!selection || typeof selection === 'undefined') {

      window.location.replace('/')
    }
  }, [selection])

  useEffect(() => {
    // hide left drawer when email app opens
    onChangeDrawer({ drawerOpen: false, drawerType: 'default' })

    // clear cart if complete order
    if (step > 2) {
      resetCart()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filter
  const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  // search filter
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  // sort options
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSort = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelFilter = (type: string, params: string, rating?: number) => {
    setLoading(true);
    switch (type) {
      case 'gender':
        if (filter.gender.some((item) => item === params)) {
          setFilter({ ...filter, gender: filter.gender.filter((item) => item !== params) });
        } else {
          setFilter({ ...filter, gender: [...filter.gender, params] });
        }
        break;
      case 'categories':
        if (filter.categories.some((item) => item === params)) {
          setFilter({ ...filter, categories: filter.categories.filter((item) => item !== params) });
        } else if (filter.categories.some((item) => item === 'all') || params === 'all') {
          setFilter({ ...filter, categories: [params] });
        } else {
          setFilter({ ...filter, categories: [...filter.categories, params] });
        }

        break;

      case 'price':
        setFilter({ ...filter, price: params });
        break;
      case 'search':
        setFilter({ ...filter, search: params });
        break;
      case 'sort':
        setFilter({ ...filter, sort: params });
        break;
      case 'rating':
        setFilter({ ...filter, rating: rating! });
        break;
      case 'reset':
        setFilter(initialState);
        break;
      default:
      // no options
    }
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
    setFilter({ ...filter, sort: index });
    setAnchorEl(null);
  };

  const sortLabel = SortOptions.filter((items) => items.value === filter.sort);

  let productResult: ReactElement | ReactElement[] = <></>;

  if (!isLoading) {
    if (products && products.length > 0) {
      productResult = products.map((product: ProductsTypo, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            offerPrice={product.offerPrice}
            salePrice={product.salePrice}
            rating={product.rating}
            color={product.colors ? product.colors[0] : undefined}
          />
        </Grid>
      ));
    } else {
      productResult = (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <ProductEmpty />
        </Grid>
      );
    }
  }

  const spacingMD = matchDownMD ? 1 : 1.5;

  return (
    <Page title="Products List">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4">Shop</Typography>
                <IconButton size="large">
                  <ArrowForwardIosIcon sx={{ width: '0.875rem', height: '0.875rem', fontWeight: 500, color: 'grey.500' }} />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                <TextField
                  sx={{ width: { xs: 140, md: 'auto' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  value={filter.search}
                  placeholder="Search Product"
                  size="small"
                  onChange={handleSearch}
                />

                <Typography sx={{ pl: 1.5, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

                <Button
                  disableRipple
                  onClick={handleDrawerOpen}
                  color="secondary"
                  startIcon={<FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />}
                >
                  Filter
                </Button>

                <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                  |
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Typography variant="h5">Sort by: </Typography>
                  <Button
                    id="demo-positioned-button"
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    aria-expanded={openSort ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ color: 'grey.500', fontWeight: 400 }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {sortLabel.length > 0 && sortLabel[0].label}
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={openSort}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    {SortOptions.map((option, index) => (
                      <MenuItem
                        sx={{ p: 1.5 }}
                        key={index}
                        selected={option.value === filter.sort}
                        onClick={(event) => handleMenuItemClick(event, option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ borderColor: 'grey.400' }} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <Main open={open}>
              <ProductFilterView filter={filter} filterIsEqual={filterIsEqual} handelFilter={handelFilter} initialState={initialState} />
              <Grid container spacing={gridSpacing}>
                {isLoading
                  ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                  : productResult}
              </Grid>
            </Main>
            <Drawer
              sx={{
                ml: open ? 3 : 0,
                height: matchDownLG ? '100vh' : 'auto',
                flexShrink: 0,
                zIndex: { xs: 1200, lg: open ? 0 : -1 },
                overflowX: 'hidden',
                width: appDrawerWidth,
                '& .MuiDrawer-paper': {
                  height: 'auto',
                  width: appDrawerWidth,
                  position: matchDownLG ? 'fixed' : 'relative',
                  border: 'none',
                  borderRadius: matchDownLG ? 0 : `${borderRadius}px`
                }
              }}
              variant={matchDownLG ? 'temporary' : 'persistent'}
              anchor="right"
              open={open}
              ModalProps={{ keepMounted: true }}
              onClose={handleDrawerOpen}
            >
              {open && (
                <PerfectScrollbar component="div">
                  <ProductFilter filter={filter} handelFilter={handelFilter} />
                </PerfectScrollbar>
              )}
            </Drawer>
          </Box>
        </Grid>
        <FloatingCart />
      </Grid>
    </Page>
  );
};

ProductsList.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='minimal' title={`lami1as front Products / for sell `}>{page}</Layout>;
};

export async function getStaticProps({ params }: { params: { titleSlug: string } }) {
  const snapshot = await dbFirestore.collection('selections').doc(params?.titleSlug).get()
  //console.log({ dataSnap: snapshot.data() })
  return {
    props: {
      selection: { ...snapshot?.data() }
    }
  }
}

export async function getStaticPaths() {
  const paths: Array<unknown> = [];
  const querySnapshot = await dbFirestore.collection('selections').get()
  querySnapshot.forEach((doc: unknown) => {
    paths.push({ params: { titleSlug: doc?.data()['titleSlug'] } });
  });

  return {
    paths,
    fallback: true
  };
}


export default ProductsList;
