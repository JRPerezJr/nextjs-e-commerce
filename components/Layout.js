import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ColorModeContext } from '../utils/ColorMode';
import { StoreContext } from '../utils/Store';

import {
  AppBar,
  Container,
  Link,
  // Switch,
  Toolbar,
  Typography,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';

import useStyles from '../utils/styles';

export default function Layout({ title, description, children }) {
  const router = useRouter();

  const nightTheme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.2rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      mode: nightTheme.palette.mode === 'light' ? 'dark' : 'light',

      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  // const darkModeChangeHandler = () => {
  // console.log('Clicked');
  // dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
  // const newDarkMode = !darkMode;
  // Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF', { sameSite: 'strict' });
  // };

  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });

    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Fashion Monsta` : 'Fashion Monsta'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>
                  Fashion Monsta
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              {/* <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              ></Switch> */}
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {nightTheme.palette.mode === 'dark' ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Fashion Monsta</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
