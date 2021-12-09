import '../styles/globals.css';

import PropTypes from 'prop-types';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';

import { SnackbarProvider } from 'notistack';

import { ToggleColorMode } from '../utils/ColorMode';
import { StoreProvider } from '../utils/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <ToggleColorMode>
          <StoreProvider>
            <PayPalScriptProvider deferLoading={true}>
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </StoreProvider>
        </ToggleColorMode>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
