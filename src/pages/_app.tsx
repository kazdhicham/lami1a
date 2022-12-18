import React, { ReactElement, ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client'
// global styles
import '../styles/globals.css';
import '../scss/style.scss';

// calendar - styles
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

// third-party
import SEO from '@/utils/next-seo-config';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { ProfileProvider } from '@/store/contexts/ProfileContext';
import { ToastContainer } from 'react-toastify';

// project-import
import ThemeCustomization from '../themes';
import NavigationScroll from '../layout/NavigationScroll';
import Locales from '@/components/shared/Locales';
import RTLLayout from '@/components/shared/RTLLayout';
import Snackbar from '@/components/shared/extended/Snackbar';

import { ProductProvider } from '@/store/contexts/ProductContext'
import { SelectionProvider } from '@/store/contexts/SelectionContext'
import { CartProvider } from '@/store/contexts/CartContext'
import { ViewerProvider } from '@/store/contexts/ViewerContext'
import { useApollo } from '@/utils/apolloClient';

import { SnackbarProvider } from '@/store/contexts/SnackbarContext'
import { ConfigProvider } from '@/store/contexts/ConfigContext'
import 'react-toastify/dist/ReactToastify.css';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

function MyApp({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const apolloClient = useApollo(pageProps)

  return (


    <ConfigProvider>
      <Head>
        <title>liismaiil Selections - shop for entertainment | ludique Organistaion and Family tools </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeCustomization>
        <NextSeo {...SEO} />
        <RTLLayout>
          <Locales>
            <ToastContainer position="top-center" />
            <ConfigProvider>
              <ApolloProvider client={apolloClient}>
                <SnackbarProvider>
                  <ProfileProvider>
                    <SelectionProvider>
                      <ProductProvider>
                        <ViewerProvider>
                          <CartProvider>
                            <NavigationScroll>
                              <>
                                {getLayout(<Component {...pageProps} />)}
                                <Snackbar />                               </>
                            </NavigationScroll>
                          </CartProvider>
                        </ViewerProvider>
                      </ProductProvider>
                    </SelectionProvider>
                  </ProfileProvider>
                </SnackbarProvider>
              </ApolloProvider>
            </ConfigProvider>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>

  );
}

export default MyApp;
