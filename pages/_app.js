import '../styles/globals.css';

// import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../components/createEmotionCache';

import { SnackbarProvider } from 'notistack';

import { ToggleColorMode } from '../utils/ColorMode';
import { StoreProvider } from '../utils/Store';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <ToggleColorMode>
          <StoreProvider>
            <Component {...pageProps} />
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
