import React, { useContext, useEffect, useState } from 'react';

import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import router from 'next/router';

import { StoreContext } from '../utils/Store';

import { useSnackbar } from 'notistack';

import {
  Card,
  Grid,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Link,
  List,
  Button,
  ListItem,
  CircularProgress,
} from '@mui/material';

import useStyles from '../utils/styles';

import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';

import { getError } from '../utils/error';

function PlaceOrder() {
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const { fullName, address, city, homeState, zipCode, country } =
    shippingAddress;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46

  const subtotal = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  const shippingCost = subtotal > 200 ? 0 : 15;

  const taxPrice = round2(subtotal * 0.15); // 15% tax

  const totalPrice = round2(subtotal + shippingCost + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (cartItems.length === 0) {
      return router.push('/cart');
    }
  }, []);

  const placeOrderHandler = async () => {
    closeSnackbar();

    try {
      setIsLoading(true);
      const response = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          subtotal,
          shippingCost,
          taxPrice,
          totalPrice,
        }),
      });

      const data = await response.json();

      dispatch({ type: 'CART_CLEAR' });

      setIsLoading(false);

      router.push(`/order/${data._id}`);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>

              <ListItem>
                {fullName} <br />
                {address}
                <br /> {city}, {homeState} {zipCode}
                <br /> {country}
              </ListItem>
            </List>
          </Card>

          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>

              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>

          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>

              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Subtotal:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography align="right">${subtotal}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography align="right">${shippingCost}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {isLoading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
